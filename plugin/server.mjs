/**
 * 需求台 Host half.
 *
 * The page is a normal DSH Client plugin; this half only owns the data bridge:
 *   - reads the bundled Feishu snapshot for an instant first paint;
 *   - refreshes it through `lark-cli base +record-list` on demand;
 *   - writes PM decisions back with `lark-cli base +record-batch-update`.
 *
 * No App Secret is used or stored. The CLI talks to Feishu with the user's
 * existing `lark-cli` authorization, so the Base stays a normal user resource.
 */
import { execFile } from 'node:child_process'
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const HERE = path.dirname(fileURLToPath(import.meta.url))
const SNAPSHOT_FILE = path.join(HERE, 'data', 'requirements.snapshot.json')
const CACHE_FILE = path.join(HERE, 'data', 'requirements.cache.json')

const DEFAULTS = {
  baseToken: '',
  tableId: '',
  baseUrl: '',
  tableName: '需求池',
  cliPath: '',
  workspacePath: '',
}

const CLI_CANDIDATES = [
  '/opt/homebrew/bin/lark-cli',
  '/usr/local/bin/lark-cli',
  path.join(os.homedir(), '.local', 'bin', 'lark-cli'),
]

function resolveCli(configured) {
  return configured || process.env.LARK_CLI || 'lark-cli'
}

function one(value) {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '')
}

function list(value) {
  return Array.isArray(value) ? value : (value ? [value] : [])
}

function number(value) {
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

/** Normalize one raw Bitable row to the stable shape the page consumes. */
function normalizeRow(raw) {
  if (raw && raw.title !== undefined && raw.recordId !== undefined && raw['需求标题'] === undefined) {
    return {
      recordId: raw.recordId ?? '',
      id: raw.id ?? '',
      title: raw.title ?? '',
      sourceType: raw.sourceType ?? '',
      source: raw.source ?? '',
      who: raw.who ?? '',
      dept: raw.dept ?? '',
      role: raw.role ?? '',
      tier: raw.tier ?? '',
      module: raw.module ?? '',
      kind: raw.kind ?? '',
      scene: raw.scene ?? '',
      pain: raw.pain ?? '',
      quote: raw.quote ?? '',
      priority: raw.priority ?? '',
      status: raw.status ?? '',
      people: Math.round(number(raw.people)),
      value: Math.round(number(raw.value)),
      fit: Math.round(number(raw.fit)),
      cost: Math.round(number(raw.cost)),
      confidence: Math.round(number(raw.confidence)),
      urgency: Math.round(number(raw.urgency)),
      tags: list(raw.tags),
      date: raw.date ?? '',
      note: raw.note ?? '',
      conclusion: raw.conclusion ?? '',
    }
  }
  return {
    recordId: raw.record_id ?? raw.recordId ?? '',
    id: raw['需求ID'] ?? '',
    title: raw['需求标题'] ?? '',
    sourceType: one(raw['来源类型']),
    source: one(raw['来源']),
    who: raw['提出方'] ?? '',
    dept: one(raw['部门']),
    role: one(raw['角色']),
    tier: one(raw['客户分层']),
    module: one(raw['模块']),
    kind: one(raw['需求类型']),
    scene: raw['场景'] ?? '',
    pain: raw['痛点'] ?? '',
    quote: raw['原话'] ?? '',
    priority: one(raw['优先级']),
    status: one(raw['状态']),
    people: Math.round(number(raw['影响人数'])),
    value: Math.round(number(raw['商业价值'])),
    fit: Math.round(number(raw['战略契合'])),
    cost: Math.round(number(raw['实现成本'])),
    confidence: Math.round(number(raw['置信度'])),
    urgency: Math.round(number(raw['紧急度'])),
    tags: list(raw['标签']),
    date: raw['提交日期'] ?? '',
    note: raw['补充说明'] ?? '',
    conclusion: raw['PM 结论'] ?? '',
  }
}

function normalizeSnapshot(raw) {
  if (!raw || !Array.isArray(raw.records)) return []
  return raw.records.map(normalizeRow).filter((row) => row.recordId)
}

async function readJson(file) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'))
  } catch {
    return null
  }
}

async function writeJson(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true })
  const tmp = `${file}.${process.pid}.tmp`
  await fs.writeFile(tmp, JSON.stringify(value, null, 1), 'utf8')
  await fs.rename(tmp, file)
}

async function loadData(config) {
  const cache = await readJson(CACHE_FILE)
  if (cache && Array.isArray(cache.records) && cache.records.length > 0) {
    return {
      source: cache.source ?? 'cache',
      baseToken: config.baseToken,
      baseUrl: config.baseUrl,
      tableId: config.tableId,
      tableName: config.tableName,
      syncedAt: cache.syncedAt ?? new Date().toISOString(),
      records: normalizeSnapshot(cache),
    }
  }
  const snapshot = await readJson(SNAPSHOT_FILE)
  return {
    source: 'snapshot',
    baseToken: config.baseToken,
    baseUrl: config.baseUrl,
    tableId: config.tableId,
    tableName: config.tableName,
    syncedAt: snapshot?.syncedAt ?? new Date().toISOString(),
    records: normalizeSnapshot(snapshot),
  }
}

async function readNdjson(file) {
  const text = await fs.readFile(file, 'utf8')
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line))
}

async function command(cli, args) {
  const { stdout, stderr } = await execFileAsync(cli, args, {
    timeout: 90_000,
    maxBuffer: 32 * 1024 * 1024,
    env: { ...process.env, HOME: os.homedir() },
  })
  return { stdout, stderr }
}

async function syncFromFeishu(config, cli) {
  const out = path.join(process.platform === 'win32' ? os.tmpdir() : '/tmp', `requirements-desk-${process.pid}-${Date.now()}.ndjson`)
  try {
    await command(cli, [
      'base', '+record-list',
      '--base-token', config.baseToken,
      '--table-id', config.tableId,
      '--limit', '200',
      '--format', 'ndjson',
      '--output', out,
      '--as', 'user',
    ])
    const rows = await readNdjson(out)
    const records = rows.map(normalizeRow).filter((row) => row.recordId)
    const data = {
      source: 'feishu',
      baseToken: config.baseToken,
      baseUrl: config.baseUrl,
      tableId: config.tableId,
      tableName: config.tableName,
      syncedAt: new Date().toISOString(),
      records,
    }
    await writeJson(CACHE_FILE, data)
    return data
  } finally {
    await fs.rm(out, { force: true }).catch(() => {})
  }
}

async function updateRecord(config, cli, input) {
  const recordId = String(input?.recordId ?? '')
  if (!/^rec[a-zA-Z0-9]+$/.test(recordId)) throw new Error('invalid recordId')
  const patch = {}
  if (typeof input.priority === 'string' && /^P[0-3]$/.test(input.priority)) {
    patch['优先级'] = [input.priority]
  }
  if (typeof input.status === 'string' && input.status.length <= 20) {
    patch['状态'] = [input.status]
  }
  if (typeof input.conclusion === 'string') {
    patch['PM 结论'] = input.conclusion.slice(0, 2000)
  }
  if (Object.keys(patch).length === 0) throw new Error('nothing to update')
  const body = JSON.stringify({ update_records: { [recordId]: patch } })
  await command(cli, [
    'base', '+record-batch-update',
    '--base-token', config.baseToken,
    '--table-id', config.tableId,
    '--json', body,
    '--as', 'user',
  ])
  return patch
}

function sendJson(res, status, body) {
  const payload = JSON.stringify(body)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(payload),
  })
  res.end(payload)
}

async function readBody(req) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > 2 * 1024 * 1024) throw new Error('body too large')
    chunks.push(chunk)
  }
  if (chunks.length === 0) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function routePath(req) {
  try {
    return new URL(req.url ?? '/', 'http://127.0.0.1').pathname
  } catch {
    return '/'
  }
}

export function applyRequirementsDesk(ctx, rawConfig = {}) {
  const config = { ...DEFAULTS, ...rawConfig }
  const cli = resolveCli(config.cliPath)
  const logger = ctx.logger ?? console

  ctx.inject(['webServer'], (scoped) => {
    scoped.effect(
      () => scoped.webServer.register({
        kind: 'prefix',
        path: '/api/requirements-desk',
        handler: async (req, res) => {
          const pathname = routePath(req)
          try {
            if (req.method === 'GET' && pathname === '/api/requirements-desk/state') {
              return sendJson(res, 200, { ok: true, data: await loadData(config) })
            }
            if (req.method === 'POST' && pathname === '/api/requirements-desk/sync') {
              const data = await syncFromFeishu(config, cli)
              return sendJson(res, 200, { ok: true, data })
            }
            if (req.method === 'POST' && pathname === '/api/requirements-desk/update') {
              const body = await readBody(req)
              const patch = await updateRecord(config, cli, body)
              const current = await loadData(config)
              const record = current.records.find((row) => row.recordId === body.recordId)
              if (record) {
                if (patch['优先级']) record.priority = patch['优先级'][0]
                if (patch['状态']) record.status = patch['状态'][0]
                if (patch['PM 结论'] !== undefined) record.conclusion = patch['PM 结论']
                await writeJson(CACHE_FILE, { ...current, source: 'feishu', syncedAt: new Date().toISOString() })
              }
              return sendJson(res, 200, { ok: true, data: { record } })
            }
            return sendJson(res, 404, { ok: false, error: 'not found' })
          } catch (error) {
            logger.warn?.(`requirements-desk: ${String(error?.message ?? error)}`)
            return sendJson(res, 500, {
              ok: false,
              error: String(error?.message ?? error),
              hint: pathname.endsWith('/sync')
                ? '请确认本机 lark-cli 已登录，且 Base 对当前用户可见；页面会继续使用内置快照。'
                : undefined,
            })
          }
        },
      }),
      'requirements-desk: data routes',
    )
  })

  logger.info?.(`requirements-desk: ready (${config.baseToken} / ${config.tableId})`)
}
