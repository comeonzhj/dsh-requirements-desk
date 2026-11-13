/**
 * Requirements Desk — DSH Client half.
 *
 * Authored directly in the module-loader format, so it needs no build step.
 * React comes from the loader; no @deepseek-ai/* Client package is imported.
 * Data comes from the Host half's /api/requirements-desk routes; the Agent
 * hand-off uses the public `uiWorkspace.startSession({ prompt })` draft API.
 */
window.__ModuleLoader__.load({
  id: '@local/requirements-desk',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState, useEffect, useMemo, useRef, useCallback } = React
    const NS = 'requirements-desk'

    // ---------------------------------------------------------------- copy --
    const DICT = {
      zh: {
        'app.title': '需求台',
        'app.subtitle': 'WorkBuddy 产品团队 · 多来源需求分析与决策工作台',
        'app.loading': '正在读取飞书需求池…',
        'app.failed': '数据桥暂时不可用',
        'app.retry': '重试',
        'app.sync': '同步飞书',
        'app.syncing': '同步中…',
        'app.synced': '已同步 {n} 条需求',
        'app.snapshot': '快照',
        'app.source': '飞书多维表',
        'app.snapshotHint': '当前展示内置快照，点击同步读取最新飞书数据',
        'app.copy': '复制',
        'app.copied': '已复制',
        'app.close': '关闭',
        'app.detail': '详情',
        'app.add': '加入分析',
        'app.added': '已加入',
        'app.remove': '移出',
        'app.openBase': '打开飞书表',
        'app.people': '人',
        'app.score': '机会分',
        'app.all': '全部',
        'tab.inbox': '需求池',
        'tab.insights': '洞察',
        'tab.review': '评审',
        'tab.prd': 'PRD 工坊',
        'tab.playbooks': '场景库',
        'kpi.total': '需求总数',
        'kpi.hot': 'P0 / P1',
        'kpi.waiting': '待评估',
        'kpi.people': '覆盖人数',
        'kpi.avg': '平均机会分',
        'kpi.week': '近 7 天新增',
        'filter.search': '搜索标题、提出方、场景、原话…',
        'filter.sourceType': '来源类型',
        'filter.dept': '提出部门',
        'filter.priority': '优先级',
        'filter.status': '状态',
        'filter.module': '模块',
        'filter.hot': '仅 P0 / P1',
        'filter.sort': '排序',
        'sort.score': '按机会分',
        'sort.date': '按提交时间',
        'sort.people': '按影响人数',
        'sort.priority': '按优先级',
        'filter.clear': '清空筛选',
        'filter.count': '筛出 {n} / 共 {m} 条',
        'filter.selectAll': '全选这 {n} 条',
        'filter.allSelected': '已全选',
        'selected.hidden': '其中 {n} 条不在当前筛选',
        'filter.empty': '没有符合条件的需求。试试放宽筛选，或同步飞书。',
        'filters.active': '当前筛选',
        'selected.n': '已选 {n} 条需求',
        'selected.clear': '清空',
        'action.analyze': '生成分析简报',
        'action.review': '发起评审',
        'action.prd': '交给 Agent 写 PRD',
        'action.send': '发送到 Agent',
        'action.compose': '组装工作包',
        'insights.sources': '来源结构',
        'insights.depts': '部门声音',
        'insights.matrix': '机会矩阵',
        'insights.matrixHint': '横轴为实现成本，纵轴为影响规模；气泡越大商业价值越高。',
        'insights.clusters': '主题聚类',
        'insights.signals': '决策信号',
        'insights.quickwins': '高性价比快赢',
        'insights.strategic': '战略客户 × P0',
        'insights.uncertain': '高优先级但置信度不足',
        'insights.concentration': '来源集中度',
        'insights.noSignal': '暂无',
        'matrix.quick': '快赢',
        'matrix.bet': '战略投入',
        'matrix.fill': '顺手做',
        'matrix.hold': '先放放',
        'matrix.cost': '实现成本 →',
        'matrix.impact': '影响规模 →',
        'review.title': '需求评审',
        'review.subtitle': '用统一的六维 rubric 把「谁在喊」变成「值不值得做」。',
        'review.selected': '评审对象',
        'review.top': '默认取机会分最高的 8 条',
        'review.summary': '评审摘要',
        'review.avg': '平均机会分',
        'review.recommend': '建议进入 P0 / P1',
        'review.risk': '需补信息',
        'review.memo': '评审纪要',
        'review.copyMemo': '复制纪要',
        'review.view': '查看详情',
        'review.dim.value': '商业价值',
        'review.dim.fit': '战略契合',
        'review.dim.impact': '影响规模',
        'review.dim.confidence': '证据置信',
        'review.dim.urgency': '紧急度',
        'review.dim.cost': '成本可控',
        'review.suggest': '建议优先级',
        'prd.title': 'PRD 工坊',
        'prd.subtitle': '把选中的需求、原话与评分组装成可评审的 PRD 初稿。',
        'prd.docTitle': '文档标题',
        'prd.records': '纳入需求',
        'prd.empty': '先在上方需求池勾选需求，或直接使用机会分最高的 3 条。',
        'prd.generate': '重新生成',
        'prd.copy': '复制 Markdown',
        'prd.download': '下载 .md',
        'prd.send': '交给 Agent 补全',
        'prd.note': '模板来自内部 PRD 规范；评审前请补充目标指标、依赖与灰度方案。',
        'playbooks.title': '可插件化场景',
        'playbooks.subtitle': '把需求池当作上下文入口，把团队规范、案例与 Skills 中台接成可复用的工作流。',
        'playbooks.run': '用选中需求运行',
        'playbooks.runTop': '用高分需求运行',
        'playbooks.sources': '已连接数据源',
        'playbooks.source.feishu': '飞书多维表',
        'playbooks.source.design': '设计组件规范',
        'playbooks.source.dev': '开发协作规范',
        'playbooks.source.cases': 'PRD / 测评案例库',
        'playbooks.source.skills': '企业内部 Skills 中台',
        'playbooks.connected': '已连接',
        'playbooks.mock': '示例接入',
        'composer.title': '组装工作包',
        'composer.subtitle': '选择工作模式，确认上下文后交给 Agent。',
        'composer.mode': '工作模式',
        'composer.modeNote': '模式只切换提示词模板；Agent 能力由当前 Preset 决定。',
        'composer.context': '上下文',
        'composer.prompt': '发给 Agent 的内容',
        'composer.promptHint': '可直接编辑；发送前不会离开本页。',
        'composer.applyTemplate': '恢复模式模板',
        'composer.send': '打开新会话并填入',
        'composer.workspace': '目标工作区',
        'composer.noWorkspace': '当前没有可用工作区，请先在左侧选择或添加一个工作区。',
        'composer.cancel': '取消',
        'composer.note': '会新建一个会话并把内容填入输入框，仍需你在输入框确认后发送。',
        'composer.empty': '至少选择一条需求。',
        'composer.sent': '已请求填入新会话输入框；若未打开，请检查目标工作区',
        'composer.noSession': '当前界面没有可用的会话入口，请在对话页重试',
        'detail.context': '场景与痛点',
        'detail.quote': '用户原话',
        'detail.metrics': '评分依据',
        'detail.rubric': '六维评审',
        'detail.decision': 'PM 决策',
        'detail.priority': '优先级',
        'detail.status': '状态',
        'detail.conclusion': 'PM 结论',
        'detail.save': '保存到飞书',
        'detail.saving': '保存中…',
        'detail.saved': '已写回飞书',
        'detail.add': '加入分析',
        'detail.prd': '用这条生成 PRD',
        'detail.note': '补充说明',
        'detail.emptyConclusion': '补充你的判断、依赖或下一步…',
        'toast.syncFail': '同步失败：{msg}',
        'toast.updateFail': '写回失败：{msg}',
        'toast.selectFirst': '先勾选至少一条需求',
        'toast.mode': '已切换到「{mode}」',
        'toast.copied': '已复制到剪贴板',
        'toast.downloaded': '已开始下载',
        'mode.analysis': '需求分析',
        'mode.analysis.desc': '归并主题、识别重复诉求、给出优先级与证据链。',
        'mode.prototype': '原型建议',
        'mode.prototype.desc': '从需求推导信息架构、低保真线框与组件映射。',
        'mode.prd': 'PRD 撰写',
        'mode.prd.desc': '按团队模板补齐背景、范围、验收与风险。',
        'mode.review': '需求评审',
        'mode.review.desc': '用六维 rubric 评分，给出结论与待补信息。',
        'mode.eval': '产品测评',
        'mode.eval.desc': '设计任务脚本、成功指标与对比评估方案。',
        'mode.compete': '竞品拆解',
        'mode.compete.desc': '把评价与功能拆成对比矩阵，找差异化机会。',
      },
      en: {
        'app.title': 'Requirements desk',
        'app.subtitle': 'WorkBuddy product team · multi-source demand triage and decisions',
        'app.loading': 'Reading the Feishu demand pool…',
        'app.failed': 'The data bridge is unavailable',
        'app.retry': 'Retry',
        'app.sync': 'Sync Feishu',
        'app.syncing': 'Syncing…',
        'app.synced': 'Synced {n} demands',
        'app.snapshot': 'Snapshot',
        'app.source': 'Feishu Bitable',
        'app.snapshotHint': 'Showing the bundled snapshot. Sync to read the latest Feishu rows.',
        'app.copy': 'Copy',
        'app.copied': 'Copied',
        'app.close': 'Close',
        'app.detail': 'Details',
        'app.add': 'Add to analysis',
        'app.added': 'Added',
        'app.remove': 'Remove',
        'app.openBase': 'Open Bitable',
        'app.people': 'people',
        'app.score': 'Opportunity',
        'app.all': 'All',
        'tab.inbox': 'Inbox',
        'tab.insights': 'Insights',
        'tab.review': 'Review',
        'tab.prd': 'PRD studio',
        'tab.playbooks': 'Playbooks',
        'kpi.total': 'Total demands',
        'kpi.hot': 'P0 / P1',
        'kpi.waiting': 'To triage',
        'kpi.people': 'People reached',
        'kpi.avg': 'Avg. score',
        'kpi.week': 'New in 7 days',
        'filter.search': 'Search title, requester, scene, quote…',
        'filter.sourceType': 'Source type',
        'filter.dept': 'Department',
        'filter.priority': 'Priority',
        'filter.status': 'Status',
        'filter.module': 'Module',
        'filter.hot': 'P0 / P1 only',
        'filter.sort': 'Sort',
        'sort.score': 'Opportunity score',
        'sort.date': 'Newest',
        'sort.people': 'Impact',
        'sort.priority': 'Priority',
        'filter.clear': 'Clear filters',
        'filter.count': '{n} of {m} shown',
        'filter.selectAll': 'Select these {n}',
        'filter.allSelected': 'All selected',
        'selected.hidden': '{n} outside the current filter',
        'filter.empty': 'No demands match. Loosen the filters or sync Feishu.',
        'filters.active': 'Active filters',
        'selected.n': '{n} selected',
        'selected.clear': 'Clear',
        'action.analyze': 'Analysis brief',
        'action.review': 'Start review',
        'action.prd': 'Ask Agent for PRD',
        'action.send': 'Send to Agent',
        'action.compose': 'Assemble work package',
        'insights.sources': 'Source mix',
        'insights.depts': 'Department voices',
        'insights.matrix': 'Opportunity matrix',
        'insights.matrixHint': 'X is implementation cost, Y is reach; bubble size is business value.',
        'insights.clusters': 'Theme clusters',
        'insights.signals': 'Decision signals',
        'insights.quickwins': 'High-leverage quick wins',
        'insights.strategic': 'Strategic account × P0',
        'insights.uncertain': 'High priority, low confidence',
        'insights.concentration': 'Source concentration',
        'insights.noSignal': 'None',
        'matrix.quick': 'Quick win',
        'matrix.bet': 'Strategic bet',
        'matrix.fill': 'Fill-in',
        'matrix.hold': 'Hold',
        'matrix.cost': 'Implementation cost →',
        'matrix.impact': 'Reach →',
        'review.title': 'Demand review',
        'review.subtitle': 'A shared six-dimension rubric turns “who is asking loudest” into “what is worth doing”.',
        'review.selected': 'In review',
        'review.top': 'Defaults to the top 8 by opportunity score',
        'review.summary': 'Review summary',
        'review.avg': 'Avg. score',
        'review.recommend': 'Recommended P0 / P1',
        'review.risk': 'Needs evidence',
        'review.memo': 'Review memo',
        'review.copyMemo': 'Copy memo',
        'review.view': 'View details',
        'review.dim.value': 'Business value',
        'review.dim.fit': 'Strategic fit',
        'review.dim.impact': 'Reach',
        'review.dim.confidence': 'Evidence',
        'review.dim.urgency': 'Urgency',
        'review.dim.cost': 'Cost control',
        'review.suggest': 'Suggested priority',
        'prd.title': 'PRD studio',
        'prd.subtitle': 'Turn selected demands, quotes and scores into a review-ready PRD draft.',
        'prd.docTitle': 'Document title',
        'prd.records': 'Included demands',
        'prd.empty': 'Select demands in the inbox, or use the top 3 by score.',
        'prd.generate': 'Regenerate',
        'prd.copy': 'Copy Markdown',
        'prd.download': 'Download .md',
        'prd.send': 'Ask Agent to complete',
        'prd.note': 'Template follows the internal PRD guide; add target metrics, dependencies and rollout before review.',
        'playbooks.title': 'Pluggable playbooks',
        'playbooks.subtitle': 'Use the demand pool as context, then connect team standards, cases and the internal Skills hub into reusable workflows.',
        'playbooks.run': 'Run with selected',
        'playbooks.runTop': 'Run with top-scored',
        'playbooks.sources': 'Connected data sources',
        'playbooks.source.feishu': 'Feishu Bitable',
        'playbooks.source.design': 'Design component spec',
        'playbooks.source.dev': 'Dev collaboration guide',
        'playbooks.source.cases': 'PRD / review cases',
        'playbooks.source.skills': 'Internal Skills hub',
        'playbooks.connected': 'Connected',
        'playbooks.mock': 'Sample adapter',
        'composer.title': 'Assemble work package',
        'composer.subtitle': 'Choose a working mode and confirm the context before handing it to the Agent.',
        'composer.mode': 'Working mode',
        'composer.modeNote': 'Modes switch the prompt template only; Agent capabilities come from the current preset.',
        'composer.context': 'Context',
        'composer.prompt': 'What the Agent receives',
        'composer.promptHint': 'Editable; nothing leaves this page until you send.',
        'composer.applyTemplate': 'Restore mode template',
        'composer.send': 'Open a new session with this draft',
        'composer.workspace': 'Target workspace',
        'composer.noWorkspace': 'No workspace is available. Choose or add one in the sidebar first.',
        'composer.cancel': 'Cancel',
        'composer.note': 'A new session opens with the content in its composer; you still confirm before sending.',
        'composer.empty': 'Select at least one demand.',
        'composer.sent': 'Draft requested in the new session; if nothing opened, check the target workspace.',
        'composer.noSession': 'No session entry is available here; try again from the conversation view.',
        'detail.context': 'Scene and pain',
        'detail.quote': 'User quote',
        'detail.metrics': 'Scoring inputs',
        'detail.rubric': 'Six-dimension rubric',
        'detail.decision': 'PM decision',
        'detail.priority': 'Priority',
        'detail.status': 'Status',
        'detail.conclusion': 'PM conclusion',
        'detail.save': 'Save to Feishu',
        'detail.saving': 'Saving…',
        'detail.saved': 'Written back to Feishu',
        'detail.add': 'Add to analysis',
        'detail.prd': 'Draft PRD from this',
        'detail.note': 'Notes',
        'detail.emptyConclusion': 'Add your judgement, dependencies or next step…',
        'toast.syncFail': 'Sync failed: {msg}',
        'toast.updateFail': 'Write-back failed: {msg}',
        'toast.selectFirst': 'Select at least one demand first',
        'toast.mode': 'Switched to “{mode}”',
        'toast.copied': 'Copied to clipboard',
        'toast.downloaded': 'Download started',
        'mode.analysis': 'Demand analysis',
        'mode.analysis.desc': 'Cluster themes, find duplicates and rank demand with an evidence chain.',
        'mode.prototype': 'Prototype guidance',
        'mode.prototype.desc': 'Derive information architecture, low-fidelity wireframes and component mapping.',
        'mode.prd': 'PRD drafting',
        'mode.prd.desc': 'Fill the team template with background, scope, acceptance and risks.',
        'mode.review': 'Demand review',
        'mode.review.desc': 'Score with the six-dimension rubric and name missing evidence.',
        'mode.eval': 'Product evaluation',
        'mode.eval.desc': 'Design task scripts, success metrics and comparison plans.',
        'mode.compete': 'Competitive teardown',
        'mode.compete.desc': 'Turn reviews and features into a comparison matrix and gaps.',
      },
    }

    function interpolate(text, params) {
      if (!params) return text
      return String(text).replace(/\{(\w+)\}/g, (_, key) => (params[key] ?? ''))
    }

    function makeT(ctx) {
      return (key, params) => {
        let lang = 'zh'
        try {
          const snap = ctx.locale.getSnapshot ? ctx.locale.getSnapshot() : null
          const id = snap?.id || snap?.locale || ctx.locale.getLocale?.()?.id
          if (id && String(id).toLowerCase().startsWith('en')) lang = 'en'
        } catch {
          /* keep zh */
        }
        const dict = DICT[lang] || DICT.zh
        const value = dict[key] ?? DICT.zh[key] ?? key
        return interpolate(value, params)
      }
    }

    function useLocaleTick(ctx) {
      const [, force] = useState(0)
      useEffect(() => {
        try {
          return ctx.locale.subscribe(() => force((n) => n + 1))
        } catch {
          return undefined
        }
      }, [ctx])
    }

    function useEscape(handler) {
      useEffect(() => {
        const onKey = (event) => {
          if (event.key === 'Escape') handler()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
      }, [handler])
    }

    function useWorkspaceItems(ctx) {
      const [items, setItems] = useState([])
      useEffect(() => {
        const service = ctx.get('workspaces')
        const source = service && service.list
        if (!source || typeof source.getSnapshot !== 'function') return undefined
        const read = () => {
          try {
            const snap = source.getSnapshot()
            setItems(Array.isArray(snap?.items) ? snap.items : [])
          } catch {
            setItems([])
          }
        }
        read()
        if (typeof source.subscribe === 'function') return source.subscribe(read)
        return undefined
      }, [ctx])
      return items
    }

    // --------------------------------------------------------------- data --
    const TABS = [
      { id: 'inbox', key: 'tab.inbox', icon: 'inbox' },
      { id: 'insights', key: 'tab.insights', icon: 'chart' },
      { id: 'review', key: 'tab.review', icon: 'gauge' },
      { id: 'prd', key: 'tab.prd', icon: 'doc' },
      { id: 'playbooks', key: 'tab.playbooks', icon: 'spark' },
    ]

    const PRIORITIES = ['P0', 'P1', 'P2', 'P3']
    const STATUSES = ['待评估', '评估中', '已排期', '开发中', '已上线', '已搁置']

    const MODES = [
      { id: 'analysis', icon: 'search', prompt: '请把选中的需求做一次结构化分析：先归并主题簇并识别重复诉求，再输出「用户—场景—痛点—证据强度」链路，最后给出优先级建议、建议切入点和 3 个待验证假设。不要泛泛而谈，每条判断都要引用需求原话或数据。' },
      { id: 'prototype', icon: 'frame', prompt: '请基于选中需求设计一个低保真原型方案：输出信息架构、关键页面流程、每个页面的区块与交互，并优先复用团队现有设计组件；若缺少对应规范，先列出需要确认的组件约束。用 ASCII 线框或结构化清单表达，并标注哪些是必须首版、哪些可以后置。' },
      { id: 'prd', icon: 'doc', prompt: '请按团队 PRD 模板（若当前会话无法读取模板，则使用通用结构）撰写一份可评审的 PRD：包含背景与问题、目标与非目标、用户与场景、需求范围、方案要点、验收标准、风险与依赖、待确认问题。每条需求都要能追溯到原话或评分依据，并显式列出需要补充的指标与灰度方案。' },
      { id: 'review', icon: 'gauge', prompt: '请用六维 rubric（商业价值、战略契合、影响规模、证据置信、紧急度、成本可控）逐条评审选中需求：给出 0–100 的机会分、建议优先级、主要风险、缺失证据，并输出「进入评审 / 补信息 / 暂缓」的结论与理由。' },
      { id: 'eval', icon: 'target', prompt: '请为选中的需求设计产品测评方案：目标与假设、测评对象与样本、核心任务脚本、成功指标与埋点、对照方案、判定标准与风险。指标要可计算，避免只有主观描述。' },
      { id: 'compete', icon: 'layers', prompt: '请把选中需求放进竞品与市场语境：输出竞品能力对比矩阵、用户评价中的高频抱怨、我们的差异化机会与不可跟风项，并给出 3 条可验证的产品假设。' },
    ]

    const PLAYBOOKS = [
      { id: 'cluster', mode: 'analysis', icon: 'merge', title: '多来源需求归并', desc: '把客服、销售、商店评价、C 端表单和内部反馈合成主题簇，识别重复与漏掉的场景。', sources: ['feishu', 'cases'], output: '主题簇 · 重复度 · 影响面 · 证据链' },
      { id: 'triage', mode: 'review', icon: 'gauge', title: '需求评审会', desc: '用统一六维 rubric 打分，自动生成评审纪要、风险清单和「补信息」问题。', sources: ['feishu', 'cases', 'skills'], output: '六维评分 · 结论 · 待补证据' },
      { id: 'prd', mode: 'prd', icon: 'doc', title: 'PRD 撰写', desc: '把需求原话、场景和评分组装成 PRD 初稿，按团队模板补齐验收与风险。', sources: ['feishu', 'design', 'dev'], output: 'PRD 初稿 · 验收标准 · 依赖' },
      { id: 'proto', mode: 'prototype', icon: 'frame', title: '原型草图', desc: '从需求推导信息架构和低保真线框，并把页面区块映射到设计组件。', sources: ['feishu', 'design'], output: 'IA · 页面流程 · 组件映射' },
      { id: 'evaluate', mode: 'eval', icon: 'target', title: '产品测评', desc: '设计任务脚本、成功指标和对照方案，让上线后的效果可被验证。', sources: ['feishu', 'cases', 'skills'], output: '测评方案 · 指标 · 判定标准' },
      { id: 'compete', mode: 'compete', icon: 'layers', title: '竞品拆解', desc: '把应用市场评价与竞品功能拆成对比矩阵，找到差异化与不可跟风项。', sources: ['feishu', 'cases'], output: '对比矩阵 · 机会点 · 假设' },
    ]

    const DATA_SOURCES = [
      { id: 'feishu', nameKey: 'playbooks.source.feishu', connected: true, meta: 'Bitable · 22 rows' },
      { id: 'design', nameKey: 'playbooks.source.design', connected: false, meta: 'Figma / Token / 组件用法' },
      { id: 'dev', nameKey: 'playbooks.source.dev', connected: false, meta: 'API / 权限 / 发布规范' },
      { id: 'cases', nameKey: 'playbooks.source.cases', connected: false, meta: 'PRD / 测评 / 复盘' },
      { id: 'skills', nameKey: 'playbooks.source.skills', connected: false, meta: 'Skill 注册表' },
    ]

    // -------------------------------------------------------------- utils --
    function icon(name, size = 18) {
      const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' }
      const paths = {
        desk: [h('rect', { key: 'a', x: 3, y: 4, width: 18, height: 16, rx: 3 }), h('path', { key: 'b', d: 'M8 9h8M8 13h5M8 17h3' })],
        inbox: [h('path', { key: 'a', d: 'M4 5h16v14H4z' }), h('path', { key: 'b', d: 'M4 13h4l2 3h4l2-3h4' })],
        chart: [h('path', { key: 'a', d: 'M4 19V5M4 19h16' }), h('path', { key: 'b', d: 'M8 16v-4M12 16V8M16 16v-6' })],
        gauge: [h('path', { key: 'a', d: 'M4 17a8 8 0 1 1 16 0' }), h('path', { key: 'b', d: 'M12 13l4-3' }), h('circle', { key: 'c', cx: 12, cy: 17, r: 1.4 })],
        doc: [h('path', { key: 'a', d: 'M6 3h8l4 4v14H6z' }), h('path', { key: 'b', d: 'M14 3v5h5M9 12h6M9 16h6' })],
        spark: [h('path', { key: 'a', d: 'M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z' }), h('path', { key: 'b', d: 'M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z' })],
        search: [h('circle', { key: 'a', cx: 11, cy: 11, r: 6.5 }), h('path', { key: 'b', d: 'M16 16l4.5 4.5' })],
        sync: [h('path', { key: 'a', d: 'M20 11a8 8 0 0 0-14.6-4.7L4 8' }), h('path', { key: 'b', d: 'M4 4v4h4M4 13a8 8 0 0 0 14.6 4.7L20 16' }), h('path', { key: 'c', d: 'M20 20v-4h-4' })],
        close: [h('path', { key: 'a', d: 'M6 6l12 12M18 6L6 18' })],
        send: [h('path', { key: 'a', d: 'M4 12l16-8-6 16-3-6z' }), h('path', { key: 'b', d: 'M11 14l9-10' })],
        copy: [h('rect', { key: 'a', x: 8, y: 8, width: 11, height: 12, rx: 2 }), h('path', { key: 'b', d: 'M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2' })],
        download: [h('path', { key: 'a', d: 'M12 4v11M7 11l5 5 5-5M5 20h14' })],
        check: [h('path', { key: 'a', d: 'M5 12l4.5 4.5L19 7' })],
        link: [h('path', { key: 'a', d: 'M10 14a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1' }), h('path', { key: 'b', d: 'M14 10a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1' })],
        quote: [h('path', { key: 'a', d: 'M8 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3H4M20 7h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3h-3' })],
        frame: [h('rect', { key: 'a', x: 4, y: 4, width: 16, height: 16, rx: 2 }), h('path', { key: 'b', d: 'M4 9h16M9 9v11' })],
        target: [h('circle', { key: 'a', cx: 12, cy: 12, r: 8 }), h('circle', { key: 'b', cx: 12, cy: 12, r: 4 }), h('circle', { key: 'c', cx: 12, cy: 12, r: 1 })],
        layers: [h('path', { key: 'a', d: 'M12 3l9 5-9 5-9-5z' }), h('path', { key: 'b', d: 'M3 12l9 5 9-5M3 16l9 5 9-5' })],
        merge: [h('path', { key: 'a', d: 'M7 4v5a4 4 0 0 0 4 4h6M17 4v5a4 4 0 0 1-4 4H7' }), h('path', { key: 'b', d: 'M17 13l3 3-3 3M7 13L4 16l3 3' })],
        chevron: [h('path', { key: 'a', d: 'M9 6l6 6-6 6' })],
        filter: [h('path', { key: 'a', d: 'M4 6h16M7 12h10M10 18h4' })],
        users: [h('circle', { key: 'a', cx: 9, cy: 8, r: 3 }), h('path', { key: 'b', d: 'M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5' })],
        clock: [h('circle', { key: 'a', cx: 12, cy: 12, r: 8 }), h('path', { key: 'b', d: 'M12 8v5l3 2' })],
      }
      return h('svg', common, ...(paths[name] || paths.desk))
    }

    function cls(...parts) {
      return parts.filter(Boolean).join(' ')
    }

    function impactNorm(people) {
      return Math.max(0, Math.min(5, (Math.log10(Math.max(0, Number(people) || 0) + 1) / Math.log10(3000)) * 5))
    }

    function scoreOf(row) {
      const raw = (Number(row.value) || 0) * 0.22
        + (Number(row.fit) || 0) * 0.20
        + (Number(row.confidence) || 0) * 0.12
        + impactNorm(row.people) * 0.16
        + (Number(row.urgency) || 0) * 0.14
        + (6 - (Number(row.cost) || 0)) * 0.16
      return Math.round(Math.max(0, Math.min(100, (raw / 5) * 100)))
    }

    function bandOf(score) {
      return score >= 80 ? 'high' : score >= 65 ? 'mid' : score >= 50 ? 'watch' : 'low'
    }

    function suggested(score) {
      return score >= 82 ? 'P0' : score >= 68 ? 'P1' : score >= 52 ? 'P2' : 'P3'
    }

    function bandLabel(band) {
      return band === 'high' ? '高' : band === 'mid' ? '中高' : band === 'watch' ? '中' : '低'
    }

    function enrich(records) {
      return (records || []).map((row) => {
        const score = scoreOf(row)
        return { ...row, score, band: bandOf(score), suggest: suggested(score), impact: impactNorm(row.people) }
      })
    }

    function fmtDate(value) {
      if (!value) return ''
      const d = new Date(value)
      if (Number.isNaN(d.getTime())) return String(value).slice(0, 10)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }

    const STORE = {
      tab: 'dsh.requirements-desk.v1.tab',
      filters: 'dsh.requirements-desk.v1.filters',
      sort: 'dsh.requirements-desk.v1.sort',
      selected: 'dsh.requirements-desk.v1.selected',
    }

    function readStored(key, fallback) {
      try {
        const raw = sessionStorage.getItem(key)
        return raw === null ? fallback : JSON.parse(raw)
      } catch {
        return fallback
      }
    }

    function writeStored(key, value) {
      try {
        sessionStorage.setItem(key, JSON.stringify(value))
      } catch {
        /* storage unavailable */
      }
    }

    function relativeTime(value) {
      if (!value) return ''
      const time = new Date(value).getTime()
      if (!Number.isFinite(time)) return ''
      const diff = Math.max(0, Date.now() - time)
      if (diff < 60_000) return '刚刚'
      if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} 分钟前`
      if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} 小时前`
      if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)} 天前`
      return fmtDate(value)
    }

    function one(value) {
      return Array.isArray(value) ? (value[0] ?? '') : (value ?? '')
    }

    function countBy(rows, key) {
      const map = new Map()
      for (const row of rows) {
        const value = one(row[key]) || '未标注'
        map.set(value, (map.get(value) || 0) + 1)
      }
      return [...map.entries()].sort((a, b) => b[1] - a[1])
    }

    function priorityClass(value) {
      return `rd-pri rd-pri-${String(value || 'P3').toLowerCase()}`
    }

    function statusClass(value) {
      const map = { 待评估: 'idle', 评估中: 'active', 已排期: 'planned', 开发中: 'building', 已上线: 'done', 已搁置: 'hold', '已搁置': 'hold' }
      return `rd-status rd-status-${map[value] || 'idle'}`
    }

    function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text)
      const area = document.createElement('textarea')
      area.value = text
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      try { document.execCommand('copy') } finally { area.remove() }
      return Promise.resolve()
    }

    function downloadText(name, text) {
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = name
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    }

    async function api(path, options = {}) {
      const response = await fetch(`/api/requirements-desk${path}`, {
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        ...options,
      })
      let body = null
      try { body = await response.json() } catch { body = null }
      if (!response.ok || !body?.ok) {
        const error = new Error(body?.error || `HTTP ${response.status}`)
        if (body?.hint) error.hint = body.hint
        throw error
      }
      return body.data
    }

    // ------------------------------------------------------------- prompts --
    function compactRow(row) {
      const lines = [
        `### ${row.id} ${row.title}`,
        `- 来源：${row.sourceType} / ${row.source}｜提出方：${row.who}（${row.dept} · ${row.role}）`,
        `- 模块与类型：${row.module}｜${row.kind}｜优先级 ${row.priority}｜状态 ${row.status}`,
        `- 影响：${row.people} 人｜商业价值 ${row.value}/5｜战略契合 ${row.fit}/5｜实现成本 ${row.cost}/5｜证据置信 ${row.confidence}/5｜紧急度 ${row.urgency}/5｜机会分 ${row.score}`,
        `- 场景：${row.scene}`,
        `- 痛点：${row.pain}`,
        `- 原话：「${row.quote}」`,
      ]
      if (row.note) lines.push(`- 补充：${row.note}`)
      if (row.conclusion) lines.push(`- 当前 PM 结论：${row.conclusion}`)
      return lines.join('\n')
    }

    function buildPrompt(records, modeId, t) {
      const mode = MODES.find((item) => item.id === modeId) || MODES[0]
      const header = [
        '你是 WorkBuddy 产品团队的需求分析 Copilot。你正在协助产品经理完成一次需求工作流。',
        `工作模式：${t(`mode.${mode.id}`)} — ${t(`mode.${mode.id}.desc`)}`,
        '',
        `我选中了 ${records.length} 条需求。请只基于下面的事实材料做判断；材料不足时明确说“需要补充”，不要编造客户、数据或结论。`,
        '',
        '## 需求材料',
        records.map(compactRow).join('\n\n'),
        '',
        '## 你要完成的任务',
        mode.prompt,
        '',
        '## 输出要求',
        '1. 先给结论，再给依据；结论要能直接用于评审或排期。',
        '2. 每条判断都标注对应的需求 ID 或原话，避免泛泛而谈。',
        '3. 区分「已知事实」「推断」「待验证假设」。',
        '4. 最后列出 3–5 个需要产品经理确认的问题。',
      ]
      return header.join('\n')
    }

    function prdSections(records, title) {
      const totalPeople = records.reduce((sum, row) => sum + (Number(row.people) || 0), 0)
      const sources = [...new Set(records.map((row) => row.source))].join('、')
      const modules = [...new Set(records.map((row) => row.module))]
      const topTags = [...new Set(records.flatMap((row) => row.tags || []))].slice(0, 8)
      const risks = [...records].sort((a, b) => a.confidence - b.confidence || b.cost - a.cost).slice(0, 4)
      const quotes = records.slice(0, 3).map((row) => `> ${row.quote} —— ${row.who}`)
      return [
        {
          title: '1. 背景与问题',
          lines: [
            `本批 PRD 覆盖 ${records.length} 条需求，来自 ${sources || '多个渠道'}，累计影响约 ${totalPeople.toLocaleString('zh-CN')} 人。`,
            `需求集中在 ${modules.join('、')}；高频标签为 ${topTags.join('、') || '暂无'}。`,
            ...quotes,
          ],
        },
        {
          title: '2. 目标与非目标',
          lines: [
            `- 目标：解决 ${records.slice(0, 3).map((row) => row.title).join('、')} 等 ${records.length} 条需求背后的共性问题，优先覆盖 ${modules.join('、')}。`,
            `- 目标：把「${records[0]?.pain || '用户当前痛点'}」这类高频反馈变成可验证的首版能力，并通过 ${records[0]?.source || '来源渠道'} 回访验证。`,
            '- 非目标：本版不覆盖本批之外的长尾需求；不替代客户成功/销售的一对一交付。',
          ],
        },
        {
          title: '3. 用户与场景',
          lines: records.map((row) => `- ${row.who}（${row.dept} · ${row.role}）：${row.scene}`),
        },
        {
          title: '4. 需求范围',
          lines: records.map((row) => `- [${row.id}] ${row.title}（${row.priority} · ${row.module} · 影响 ${row.people} 人 · 机会分 ${row.score}）`),
        },
        {
          title: '5. 方案要点',
          lines: [
            ...records.map((row) => `- ${row.module}（${row.kind}）：首版聚焦「${row.pain}」；典型场景：${row.scene}；需确认：${row.note || '接口/权限/数据口径'}。`),
            '- 交互层：优先复用团队现有设计组件；若缺少对应组件，先列出约束再进入设计，不为了复用而扭曲需求。',
            '- 开发协作：按开发协作规范确认接口、权限、灰度与回滚；跨团队依赖在评审前单列。',
          ],
        },
        {
          title: '6. 验收标准',
          lines: [
            ...records.map((row) => `- ${row.title}：在「${row.scene}」下，${row.role} 不再需要「${row.pain}」；可通过 ${row.source} 回访或埋点验证。`),
            `- 数据一致性：页面/文档中的需求与飞书记录一致；同步失败时保留上次快照并提示。`,
            '- 可追溯性：每条需求保留 ID、来源、原话与评分依据，评审时能回到证据。',
          ],
        },
        {
          title: '7. 风险、依赖与待确认',
          lines: [
            ...risks.map((row) => `- ${row.title}：置信度 ${row.confidence}/5、成本 ${row.cost}/5；${row.note || '需补充客户样本与实现评估。'}`),
            '- 依赖：飞书 Base 权限与字段稳定性、设计组件规范版本、开发协作规范中的接口与权限约束。',
            '- 待确认：目标指标与基线、首发客户范围、灰度与回滚方案、数据保留与合规要求。',
          ],
        },
      ]
    }

    function prdMarkdown(records, title) {
      const sections = prdSections(records, title)
      return [`# ${title}`, '', ...sections.flatMap((section) => [`## ${section.title}`, '', ...section.lines, '']), '---', '', '> 由 DSH 需求台生成；请补充目标指标、依赖与灰度方案后进入评审。'].join('\n')
    }

    function memoText(records, t) {
      const lines = [
        `# ${t('review.memo')} · ${new Date().toLocaleDateString('zh-CN')}`,
        '',
        `评审对象：${records.length} 条需求`,
        '',
      ]
      for (const row of records) {
        lines.push(`## ${row.id} ${row.title}`)
        lines.push(`- 机会分：${row.score}（建议 ${row.suggest}，当前 ${row.priority}）`)
        lines.push(`- 六维：价值 ${row.value}｜战略 ${row.fit}｜影响 ${row.people} 人｜置信 ${row.confidence}｜紧急 ${row.urgency}｜成本 ${row.cost}`)
        lines.push(`- 结论：${row.conclusion || (row.score >= 68 ? '建议进入评审' : '先补证据或暂缓')}`)
        lines.push(`- 风险：${row.confidence <= 3 ? '证据不足；' : ''}${row.cost >= 4 ? '实现成本高；' : ''}${row.note || '暂无补充'}`)
        lines.push('')
      }
      return lines.join('\n')
    }

    // ----------------------------------------------------------- components --
    function Pill({ children, tone = 'neutral', title }) {
      return h('span', { className: `rd-pill rd-pill-${tone}`, title }, children)
    }

    function PriorityPill({ value }) {
      return h('span', { className: priorityClass(value) }, value || 'P3')
    }

    function StatusPill({ value }) {
      return h('span', { className: statusClass(value) }, value || '待评估')
    }

    function ScoreRing({ score, size = 44 }) {
      const style = { width: size, height: size, background: `conic-gradient(var(--dsw-alias-brand-primary) ${score}%, var(--dsw-alias-bg-layer-2) 0)` }
      return h('div', { className: 'rd-ring', style, title: `Opportunity score ${score}` },
        h('span', { className: 'rd-ring-inner' }, score))
    }

    function Kpi({ label, value, hint, tone, onClick }) {
      return h(onClick ? 'button' : 'div', {
        className: cls('rd-kpi', tone && `rd-kpi-${tone}`, onClick && 'rd-kpi-click'),
        onClick,
        type: onClick ? 'button' : undefined,
      },
        h('span', { className: 'rd-kpi-label' }, label),
        h('strong', { className: 'rd-kpi-value' }, value),
        hint ? h('span', { className: 'rd-kpi-hint' }, hint) : null)
    }

    function BarList({ rows, total, emptyText }) {
      const max = Math.max(1, ...rows.map(([, n]) => n))
      if (!rows.length) return h('p', { className: 'rd-muted' }, emptyText || '暂无数据')
      return h('div', { className: 'rd-bars' }, rows.map(([label, count], index) => h('div', { className: 'rd-bar-row', key: label },
        h('div', { className: 'rd-bar-head' },
          h('span', { className: 'rd-bar-label', title: label }, label),
          h('span', { className: 'rd-bar-count' }, count, total ? h('em', null, ` · ${Math.round((count / total) * 100)}%`) : null)),
        h('div', { className: 'rd-bar-track' },
          h('div', { className: 'rd-bar-fill', style: { width: `${Math.max(4, (count / max) * 100)}%`, opacity: String(0.9 - Math.min(index, 8) * 0.055) } })))))
    }

    function SectionCard({ title, subtitle, actions, children, className }) {
      return h('section', { className: cls('rd-card', className) },
        h('div', { className: 'rd-card-head' },
          h('div', null,
            h('h3', { className: 'rd-card-title' }, title),
            subtitle ? h('p', { className: 'rd-card-sub' }, subtitle) : null),
          actions ? h('div', { className: 'rd-card-actions' }, actions) : null),
        children)
    }

    function EmptyState({ title, hint, action }) {
      return h('div', { className: 'rd-empty' },
        h('div', { className: 'rd-empty-mark' }, icon('desk', 28)),
        h('strong', null, title),
        hint ? h('p', null, hint) : null,
        action)
    }

    function Metric({ label, value, hint }) {
      return h('div', { className: 'rd-metric' },
        h('span', { className: 'rd-metric-label' }, label),
        h('strong', { className: 'rd-metric-value' }, value),
        hint ? h('span', { className: 'rd-metric-hint' }, hint) : null)
    }

    function RubricBar({ label, value, invert }) {
      const pct = Math.max(0, Math.min(100, (Number(value) || 0) / 5 * 100))
      const signed = invert ? 6 - (Number(value) || 0) : Number(value) || 0
      return h('div', { className: 'rd-rubric-row' },
        h('span', { className: 'rd-rubric-label' }, label),
        h('div', { className: 'rd-rubric-track' },
          h('div', { className: 'rd-rubric-fill', style: { width: `${pct}%` }, 'data-invert': invert ? 'true' : 'false' })),
        h('b', { className: 'rd-rubric-value' }, signed, '/5'))
    }

    // --------------------------------------------------------------- inbox --
    function RequirementRow({ row, selected, onToggle, onOpen, t }) {
      return h('article', {
        className: cls('rd-row', selected && 'rd-row-selected'),
        onClick: () => onOpen(row),
        tabIndex: 0,
        onKeyDown: (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpen(row) } },
      },
        h('label', { className: 'rd-check', onClick: (event) => event.stopPropagation() },
          h('input', { type: 'checkbox', checked: selected, onChange: () => onToggle(row.id), 'aria-label': `选择 ${row.title}` }),
          h('span', { className: 'rd-check-box' }, selected ? icon('check', 12) : null)),
        h('div', { className: 'rd-row-main' },
          h('div', { className: 'rd-row-top' },
            h('span', { className: 'rd-row-id' }, row.id),
            h('h4', { className: 'rd-row-title' }, row.title),
            h(PriorityPill, { value: row.priority }),
            h(StatusPill, { value: row.status })),
          h('div', { className: 'rd-row-meta' },
            h('span', { className: 'rd-src' }, row.sourceType, h('i', null, '·'), row.source),
            h('span', null, row.dept),
            h('span', null, row.module),
            h('span', null, h('b', null, row.people.toLocaleString('zh-CN')), ` ${t('app.people')}`),
            h('span', null, fmtDate(row.date))),
          h('p', { className: 'rd-row-quote' }, h('span', { className: 'rd-quote-mark' }, '“'), row.quote, h('span', { className: 'rd-quote-mark' }, '”')),
          h('div', { className: 'rd-row-tags' }, (row.tags || []).slice(0, 4).map((tag) => h(Pill, { key: tag, tone: 'quiet' }, tag)))),
        h('div', { className: 'rd-row-side' },
          h('div', { className: 'rd-score-wrap' },
            h(ScoreRing, { score: row.score, size: 46 }),
            h('div', { className: 'rd-score-copy' },
              h('span', { className: 'rd-score-label' }, t('app.score')),
              h('strong', { className: `rd-score-band rd-band-${row.band}` }, row.suggest))),
          h('div', { className: 'rd-row-actions' },
            h('button', {
              type: 'button',
              className: 'rd-btn rd-btn-ghost',
              onClick: (event) => { event.stopPropagation(); onOpen(row) },
            }, t('app.detail')),
            h('button', {
              type: 'button',
              className: cls('rd-btn rd-btn-soft', selected && 'is-on'),
              onClick: (event) => { event.stopPropagation(); onToggle(row.id) },
            }, selected ? t('app.added') : t('app.add')))))
    }

    function Inbox({ rows, total, selectedCount, filters, setFilters, sort, setSort, selected, onToggle, onOpen, onClear, onSelectAll, t }) {
      const select = (key, options, label) => h('label', { className: 'rd-select-wrap' },
        h('span', { className: 'rd-select-label' }, label),
        h('select', {
          value: filters[key],
          onChange: (event) => setFilters((prev) => ({ ...prev, [key]: event.target.value })),
        },
          h('option', { value: '' }, t('app.all')),
          options.map((option) => h('option', { key: option, value: option }, option))))
      const active = [
        filters.q && ['q', filters.q],
        filters.onlyHot && ['onlyHot', t('filter.hot')],
        filters.sourceType && ['sourceType', filters.sourceType],
        filters.dept && ['dept', filters.dept],
        filters.priority && ['priority', filters.priority],
        filters.status && ['status', filters.status],
        filters.module && ['module', filters.module],
      ].filter(Boolean)
      return h('div', { className: 'rd-inbox' },
        h('div', { className: 'rd-toolbar' },
          h('div', { className: 'rd-search' },
            icon('search', 16),
            h('input', {
              value: filters.q,
              placeholder: t('filter.search'),
              onChange: (event) => setFilters((prev) => ({ ...prev, q: event.target.value })),
            })),
          select('sourceType', ['B 端企业', 'C 端用户', '内部同事'], t('filter.sourceType')),
          select('dept', ['产品部', '设计部', '研发部', '市场部', '销售部', '客服部', '运营部', '安全合规', '客户成功', '企业客户', 'C 端用户', '开发者社区'], t('filter.dept')),
          select('priority', PRIORITIES, t('filter.priority')),
          select('status', STATUSES, t('filter.status')),
          select('module', ['会话与任务', '知识库', '技能与插件', '协作共享', '客户端体验', '开放平台', '计费与权限', '模型能力', '模板与工作流'], t('filter.module')),
          h('button', {
            type: 'button',
            className: cls('rd-toggle', filters.onlyHot && 'is-on'),
            onClick: () => setFilters((prev) => ({ ...prev, onlyHot: !prev.onlyHot })),
          }, icon('filter', 14), t('filter.hot')),
          h('label', { className: 'rd-select-wrap rd-sort' },
            h('span', { className: 'rd-select-label' }, t('filter.sort')),
            h('select', { value: sort, onChange: (event) => setSort(event.target.value) },
              h('option', { value: 'score' }, t('sort.score')),
              h('option', { value: 'date' }, t('sort.date')),
              h('option', { value: 'people' }, t('sort.people')),
              h('option', { value: 'priority' }, t('sort.priority'))))),
        active.length ? h('div', { className: 'rd-active-filters' },
          h('span', { className: 'rd-muted' }, t('filters.active')),
          active.map(([key, value]) => h('button', {
            key, type: 'button', className: 'rd-filter-chip',
            onClick: () => setFilters((prev) => ({ ...prev, [key]: key === 'onlyHot' ? false : '' })),
          }, value, h('span', null, '×'))),
          h('button', { type: 'button', className: 'rd-link-btn', onClick: onClear }, t('filter.clear'))) : null,
        h('div', { className: 'rd-list-meta' },
          h('span', null, t('filter.count', { n: rows.length, m: total })),
          h('button', {
            type: 'button',
            className: 'rd-link-btn',
            disabled: rows.length === 0 || selectedCount >= rows.length,
            onClick: onSelectAll,
          }, selectedCount >= rows.length ? t('filter.allSelected') : t('filter.selectAll', { n: rows.length }))),
        rows.length ? h('div', { className: 'rd-list' },
          rows.map((row) => h(RequirementRow, { key: row.id, row, selected: selected.has(row.id), onToggle, onOpen, t }))) : h(EmptyState, {
          title: t('filter.empty'),
          hint: t('app.snapshotHint'),
          action: h('button', { type: 'button', className: 'rd-btn rd-btn-soft', onClick: onClear }, t('filter.clear')),
        }))
    }

    // ------------------------------------------------------------ insights --
    function OpportunityMatrix({ rows, t }) {
      const width = 620
      const height = 330
      const pad = { l: 46, r: 18, t: 20, b: 42 }
      const px = (cost) => pad.l + ((Math.max(1, Math.min(5, cost)) - 1) / 4) * (width - pad.l - pad.r)
      const py = (impact) => height - pad.b - (impact / 5) * (height - pad.t - pad.b)
      const fillFor = (priority) => (priority === 'P0' || priority === 'P1') ? '#3450E4'
        : priority === 'P2' ? 'var(--dsw-alias-label-secondary)' : 'var(--dsw-alias-border-l2)'
      return h('div', { className: 'rd-matrix-wrap' },
        h('svg', { viewBox: `0 0 ${width} ${height}`, className: 'rd-matrix', role: 'img', 'aria-label': t('insights.matrix') },
          h('rect', { x: pad.l, y: pad.t, width: width - pad.l - pad.r, height: height - pad.t - pad.b, rx: 12, fill: 'var(--dsw-alias-bg-layer-2)' }),
          [1, 2, 3, 4, 5].map((v) => h('g', { key: v },
            h('line', { x1: px(v), y1: pad.t, x2: px(v), y2: height - pad.b, stroke: 'var(--dsw-alias-border-l1)', strokeDasharray: '3 5' }),
            h('text', { x: px(v), y: height - pad.b + 18, textAnchor: 'middle', className: 'rd-axis-text' }, v))),
          [1, 2, 3, 4, 5].map((v) => h('g', { key: `y${v}` },
            h('line', { x1: pad.l, y1: py(v), x2: width - pad.r, y2: py(v), stroke: 'var(--dsw-alias-border-l1)', strokeDasharray: '3 5' }),
            h('text', { x: pad.l - 12, y: py(v) + 4, textAnchor: 'end', className: 'rd-axis-text' }, v))),
          h('line', { x1: px(2.5), y1: pad.t, x2: px(2.5), y2: height - pad.b, stroke: 'var(--dsw-alias-border-l2)' }),
          h('line', { x1: pad.l, y1: py(2.5), x2: width - pad.r, y2: py(2.5), stroke: 'var(--dsw-alias-border-l2)' }),
          h('text', { x: pad.l + 10, y: pad.t + 18, className: 'rd-quadrant-label' }, t('matrix.quick')),
          h('text', { x: width - pad.r - 10, y: pad.t + 18, textAnchor: 'end', className: 'rd-quadrant-label' }, t('matrix.bet')),
          h('text', { x: pad.l + 10, y: height - pad.b - 10, className: 'rd-quadrant-label' }, t('matrix.fill')),
          h('text', { x: width - pad.r - 10, y: height - pad.b - 10, textAnchor: 'end', className: 'rd-quadrant-label' }, t('matrix.hold')),
          h('text', { x: width / 2, y: height - 6, textAnchor: 'middle', className: 'rd-axis-title' }, t('matrix.cost')),
          h('text', { x: 12, y: height / 2, textAnchor: 'middle', transform: `rotate(-90 12 ${height / 2})`, className: 'rd-axis-title' }, t('matrix.impact')),
          rows.map((row) => {
            const r = 5 + (Number(row.value) || 1) * 1.9
            return h('g', { key: row.id, className: 'rd-matrix-dot' },
              h('circle', { cx: px(row.cost), cy: py(row.impact), r, fill: fillFor(row.priority), opacity: 0.72, stroke: 'var(--dsw-alias-bg-layer-1)', strokeWidth: 1.5 },
                h('title', null, `${row.id} ${row.title}\n${row.priority} · score ${row.score} · cost ${row.cost} · reach ${row.people}`)),
              row.score >= 78 ? h('text', { x: px(row.cost) + r + 4, y: py(row.impact) + 3, className: 'rd-matrix-id' }, row.id.slice(-3)) : null)
          })) )
    }

    function Insights({ rows, t }) {
      const sourceRows = useMemo(() => countBy(rows, 'sourceType'), [rows])
      const detailSources = useMemo(() => countBy(rows, 'source').slice(0, 7), [rows])
      const deptRows = useMemo(() => countBy(rows, 'dept').slice(0, 8), [rows])
      const clusters = useMemo(() => {
        const map = new Map()
        for (const row of rows) {
          const key = row.module || '未标注'
          const item = map.get(key) || { key, count: 0, score: 0, people: 0, tags: new Set(), top: row }
          item.count += 1
          item.score += row.score
          item.people += row.people
          for (const tag of row.tags || []) item.tags.add(tag)
          if (row.score > item.top.score) item.top = row
          map.set(key, item)
        }
        return [...map.values()].sort((a, b) => b.count - a.count || b.score - a.score).slice(0, 6)
          .map((item) => ({ ...item, avg: Math.round(item.score / item.count), tags: [...item.tags].slice(0, 3) }))
      }, [rows])
      const quickWins = rows.filter((row) => row.score >= 65 && row.cost <= 2).sort((a, b) => b.score - a.score).slice(0, 3)
      const strategic = rows.filter((row) => row.tier === '战略客户' && row.priority === 'P0')
      const uncertain = rows.filter((row) => (row.priority === 'P0' || row.priority === 'P1') && row.confidence <= 3).sort((a, b) => b.score - a.score).slice(0, 3)
      const topSource = detailSources[0]
      const total = rows.length || 1
      return h('div', { className: 'rd-stack' },
        h('div', { className: 'rd-grid rd-grid-2' },
          h(SectionCard, { title: t('insights.sources'), subtitle: `${rows.length} 条需求 · ${sourceRows.length} 类来源` },
            h(BarList, { rows: sourceRows, total: rows.length }),
            h('div', { className: 'rd-mini-divider' }),
            h(BarList, { rows: detailSources, total: rows.length })),
          h(SectionCard, { title: t('insights.depts'), subtitle: '谁在替用户说话' },
            h(BarList, { rows: deptRows, total: rows.length }))),
        h(SectionCard, { title: t('insights.matrix'), subtitle: t('insights.matrixHint') },
          h(OpportunityMatrix, { rows, t })),
        h('div', { className: 'rd-grid rd-grid-2' },
          h(SectionCard, { title: t('insights.clusters'), subtitle: '按模块聚合，而不是按提交顺序' },
            h('div', { className: 'rd-clusters' }, clusters.map((cluster) => h('button', {
              key: cluster.key, type: 'button', className: 'rd-cluster',
              onClick: () => {},
            },
              h('div', { className: 'rd-cluster-top' },
                h('strong', null, cluster.key),
                h('span', { className: 'rd-cluster-count' }, cluster.count, ' 条')),
              h('div', { className: 'rd-cluster-meta' }, `平均机会分 ${cluster.avg} · 覆盖 ${cluster.people.toLocaleString('zh-CN')} 人`),
              h('p', { className: 'rd-cluster-quote' }, cluster.top.title),
              h('div', { className: 'rd-cluster-tags' }, cluster.tags.map((tag) => h(Pill, { key: tag, tone: 'quiet' }, tag))))))),
          h(SectionCard, { title: t('insights.signals'), subtitle: '用规则先筛一遍，把评审时间花在真正需要判断的地方' },
            h('div', { className: 'rd-signals' },
              h(Signal, { title: t('insights.quickwins'), count: quickWins.length, rows: quickWins, tone: 'success' }),
              h(Signal, { title: t('insights.strategic'), count: strategic.length, rows: strategic, tone: 'error' }),
              h(Signal, { title: t('insights.uncertain'), count: uncertain.length, rows: uncertain, tone: 'warn' }),
              h('div', { className: 'rd-signal rd-signal-plain' },
                h('div', { className: 'rd-signal-head' }, h('strong', null, t('insights.concentration')), h('b', null, `${Math.round(((topSource?.[1] || 0) / total) * 100)}%`)),
                h('p', null, topSource ? `${topSource[0]} 占 ${topSource[1]} 条；建议增加其他渠道的样本，避免只听见一个声音。` : t('insights.noSignal')))))) )
    }

    function Signal({ title, count, rows, tone }) {
      const list = rows.slice(0, 2)
      return h('div', { className: `rd-signal rd-signal-${tone}` },
        h('div', { className: 'rd-signal-head' }, h('strong', null, title), h('b', null, count)),
        list.length ? list.map((row) => h('p', { key: row.id }, `${row.id} · ${row.title}`)) : h('p', { className: 'rd-muted' }, '暂无'))
    }

    // -------------------------------------------------------------- review --
    function Review({ rows, allRows, selected, t, onOpen, onCompose, onNotify }) {
      const set = useMemo(() => {
        const picked = rows.filter((row) => selected.has(row.id))
        return (picked.length ? picked : [...rows].sort((a, b) => b.score - a.score).slice(0, 8))
      }, [rows, selected])
      const avg = set.length ? Math.round(set.reduce((sum, row) => sum + row.score, 0) / set.length) : 0
      const recommend = set.filter((row) => row.score >= 68).length
      const risks = set.filter((row) => row.confidence <= 3 || row.cost >= 4).length
      const memo = memoText(set, t)
      return h('div', { className: 'rd-stack' },
        h('div', { className: 'rd-page-head' },
          h('div', null,
            h('h2', { className: 'rd-page-title' }, t('review.title')),
            h('p', { className: 'rd-page-sub' }, t('review.subtitle'))),
          h('div', { className: 'rd-page-actions' },
            h('button', { type: 'button', className: 'rd-btn rd-btn-soft', onClick: () => onCompose('review', set) }, icon('send', 16), t('action.review')),
            h('button', { type: 'button', className: 'rd-btn rd-btn-ghost', onClick: () => copyText(memo).then(() => onNotify(t('toast.copied'))) }, icon('copy', 16), t('review.copyMemo')))),
        h('div', { className: 'rd-kpis rd-kpis-4' },
          h(Kpi, { label: t('review.selected'), value: set.length, hint: selected.size ? '来自当前勾选' : t('review.top') }),
          h(Kpi, { label: t('review.avg'), value: avg, tone: 'brand' }),
          h(Kpi, { label: t('review.recommend'), value: recommend, tone: 'success' }),
          h(Kpi, { label: t('review.risk'), value: risks, tone: 'warn' })),
        h('div', { className: 'rd-review-grid' },
          set.map((row) => h('article', { key: row.id, className: 'rd-review-card' },
            h('div', { className: 'rd-review-top' },
              h('div', null,
                h('div', { className: 'rd-row-meta' }, h('span', { className: 'rd-row-id' }, row.id), h(PriorityPill, { value: row.priority }), h(StatusPill, { value: row.status })),
                h('h3', { className: 'rd-review-title' }, row.title),
                h('p', { className: 'rd-muted' }, `${row.who} · ${row.module} · ${row.people.toLocaleString('zh-CN')} 人`)),
              h('div', { className: 'rd-review-score' }, h(ScoreRing, { score: row.score, size: 64 }), h('span', null, t('review.suggest'), h('b', null, row.suggest)))),
            h('div', { className: 'rd-rubric' },
              h(RubricBar, { label: t('review.dim.value'), value: row.value }),
              h(RubricBar, { label: t('review.dim.fit'), value: row.fit }),
              h(RubricBar, { label: t('review.dim.impact'), value: row.impact }),
              h(RubricBar, { label: t('review.dim.confidence'), value: row.confidence }),
              h(RubricBar, { label: t('review.dim.urgency'), value: row.urgency }),
              h(RubricBar, { label: t('review.dim.cost'), value: row.cost, invert: true })),
            h('p', { className: 'rd-review-quote' }, row.quote),
            h('div', { className: 'rd-review-foot' },
              h('span', { className: 'rd-muted' }, row.conclusion || row.note || '暂无 PM 结论'),
              h('button', { type: 'button', className: 'rd-link-btn', onClick: () => onOpen(row) }, t('review.view'), icon('chevron', 14)))))),
        h(SectionCard, { title: t('review.memo'), subtitle: '可直接贴进评审会纪要或飞书文档',
          actions: h('button', { type: 'button', className: 'rd-btn rd-btn-ghost', onClick: () => copyText(memo).then(() => onNotify(t('toast.copied'))) }, icon('copy', 14), t('app.copy')) },
          h('pre', { className: 'rd-memo' }, memo)))
    }

    // ----------------------------------------------------------------- prd --
    function Prd({ rows, selected, t, onCompose, onNotify }) {
      const included = useMemo(() => {
        const picked = rows.filter((row) => selected.has(row.id))
        return (picked.length ? picked : [...rows].sort((a, b) => b.score - a.score).slice(0, 3))
      }, [rows, selected])
      const [title, setTitle] = useState('WorkBuddy 需求台：多来源需求统一分析与优先级决策')
      const sections = useMemo(() => prdSections(included, title), [included, title])
      const markdown = useMemo(() => prdMarkdown(included, title), [included, title])
      return h('div', { className: 'rd-stack' },
        h('div', { className: 'rd-page-head' },
          h('div', null,
            h('h2', { className: 'rd-page-title' }, t('prd.title')),
            h('p', { className: 'rd-page-sub' }, t('prd.subtitle'))),
          h('div', { className: 'rd-page-actions' },
            h('button', { type: 'button', className: 'rd-btn rd-btn-ghost', onClick: () => copyText(markdown).then(() => onNotify(t('toast.copied'))) }, icon('copy', 16), t('prd.copy')),
            h('button', { type: 'button', className: 'rd-btn rd-btn-ghost', onClick: () => { downloadText('requirements-prd.md', markdown); onNotify(t('toast.downloaded')) } }, icon('download', 16), t('prd.download')),
            h('button', { type: 'button', className: 'rd-btn rd-btn-primary', onClick: () => onCompose('prd', included) }, icon('send', 16), t('prd.send')))),
        h('div', { className: 'rd-prd-layout' },
          h('div', { className: 'rd-prd-main' },
            h('label', { className: 'rd-field' },
              h('span', null, t('prd.docTitle')),
              h('input', { className: 'rd-input rd-input-lg', value: title, onChange: (event) => setTitle(event.target.value) })),
            h('article', { className: 'rd-doc' },
              h('div', { className: 'rd-doc-meta' },
                h('span', null, '需求台自动生成'),
                h('span', null, `${included.length} 条需求`),
                h('span', null, `${included.reduce((sum, row) => sum + row.people, 0).toLocaleString('zh-CN')} 人受影响`)),
              sections.map((section) => h('section', { key: section.title, className: 'rd-doc-section' },
                h('h3', null, section.title),
                section.lines.map((line, index) => line.startsWith('- ') ? h('p', { key: index, className: 'rd-doc-bullet' }, line) : h('p', { key: index }, line))))),
            h('p', { className: 'rd-note' }, t('prd.note'))),
          h('aside', { className: 'rd-prd-side' },
            h('h4', null, t('prd.records')),
            h('div', { className: 'rd-prd-list' }, included.map((row) => h('button', {
              key: row.id, type: 'button', className: 'rd-prd-item', onClick: () => onCompose('prd', [row]),
            },
              h('span', { className: 'rd-prd-item-id' }, row.id),
              h('strong', null, row.title),
              h('span', { className: 'rd-muted' }, `${row.module} · 机会分 ${row.score}`)))),
            h('p', { className: 'rd-note' }, selected.size ? '当前使用需求池勾选。' : t('prd.empty'))))
      )
    }

    // ------------------------------------------------------------ playbooks --
    function Playbooks({ rows, selected, t, onCompose }) {
      const picked = rows.filter((row) => selected.has(row.id))
      const top = [...rows].sort((a, b) => b.score - a.score).slice(0, 3)
      const run = (playbook) => onCompose(playbook.mode, picked.length ? picked : top)
      return h('div', { className: 'rd-stack' },
        h('div', { className: 'rd-page-head' },
          h('div', null,
            h('h2', { className: 'rd-page-title' }, t('playbooks.title')),
            h('p', { className: 'rd-page-sub' }, t('playbooks.subtitle'))),
          h('div', { className: 'rd-page-actions' },
            h('span', { className: 'rd-soft-badge' }, icon('check', 14), `${picked.length || top.length} 条上下文`))),
        h('div', { className: 'rd-playbook-grid' },
          PLAYBOOKS.map((playbook) => h('article', { key: playbook.id, className: 'rd-playbook' },
            h('div', { className: 'rd-playbook-icon' }, icon(playbook.icon, 22)),
            h('h3', null, playbook.title),
            h('p', null, playbook.desc),
            h('div', { className: 'rd-playbook-output' }, icon('target', 14), playbook.output),
            h('div', { className: 'rd-playbook-sources' }, playbook.sources.map((id) => {
              const source = DATA_SOURCES.find((item) => item.id === id)
              return h(Pill, { key: id, tone: source?.connected ? 'quiet' : 'muted' }, t(`playbooks.source.${id}`))
            })),
            h('button', { type: 'button', className: 'rd-btn rd-btn-primary rd-btn-block', onClick: () => run(playbook) },
              icon('send', 15), picked.length ? t('playbooks.run') : t('playbooks.runTop'))))),
        h(SectionCard, { title: t('playbooks.sources'), subtitle: '页面只负责编排；事实源仍属于各自系统' },
          h('div', { className: 'rd-datasources' }, DATA_SOURCES.map((source) => h('div', { key: source.id, className: 'rd-datasource' },
            h('span', { className: cls('rd-dot', source.connected ? 'is-on' : 'is-mock') }),
            h('div', null, h('strong', null, t(source.nameKey)), h('span', null, source.id === 'feishu' ? `${rows.length} 条 · 已连接` : source.meta)),
            h(Pill, { tone: source.connected ? 'success' : 'quiet' }, source.connected ? t('playbooks.connected') : t('playbooks.mock')))))),
        h('div', { className: 'rd-idea-grid' },
          ['需求池 → 主题簇 → 机会矩阵', '勾选需求 → 评审纪要 → 排期', '原话 + 评分 → PRD 初稿', '需求 → IA / 线框 / 组件映射', 'PRD → 测评方案 → 指标', '评价 + 竞品 → 差异化机会'].map((idea) => h('div', { key: idea, className: 'rd-idea' }, icon('spark', 14), idea))))
    }

    // -------------------------------------------------------------- detail --
    function DetailDrawer({ row, t, onClose, onToggle, selected, onCompose, onSave, onNotify }) {
      const [priority, setPriority] = useState(row.priority)
      const [status, setStatus] = useState(row.status)
      const [conclusion, setConclusion] = useState(row.conclusion || '')
      const [saving, setSaving] = useState(false)
      useEscape(onClose)
      useEffect(() => {
        setPriority(row.priority)
        setStatus(row.status)
        setConclusion(row.conclusion || '')
      }, [row.recordId])
      const save = async () => {
        setSaving(true)
        try {
          await onSave({ recordId: row.recordId, priority, status, conclusion })
          onNotify(t('detail.saved'))
        } catch (error) {
          onNotify(t('toast.updateFail', { msg: error.message }), 'err')
        } finally {
          setSaving(false)
        }
      }
      return h('div', { className: 'rd-drawer-layer' },
        h('div', { className: 'rd-backdrop', onClick: onClose }),
        h('aside', { className: 'rd-drawer', role: 'dialog', 'aria-modal': 'true', 'aria-label': row.title },
          h('header', { className: 'rd-drawer-head' },
            h('div', null,
              h('div', { className: 'rd-row-meta' }, h('span', { className: 'rd-row-id' }, row.id), h(PriorityPill, { value: row.priority }), h(StatusPill, { value: row.status })),
              h('h2', null, row.title)),
            h('button', { type: 'button', className: 'rd-icon-btn', onClick: onClose, 'aria-label': t('app.close') }, icon('close', 18))),
          h('div', { className: 'rd-drawer-body' },
            h('div', { className: 'rd-detail-meta' },
              h(Pill, { tone: 'brand' }, row.sourceType),
              h(Pill, { tone: 'quiet' }, row.source),
              h(Pill, { tone: 'quiet' }, row.dept),
              h(Pill, { tone: 'quiet' }, row.module),
              h(Pill, { tone: 'quiet' }, row.tier)),
            h('div', { className: 'rd-quote-card' },
              h('span', { className: 'rd-quote-icon' }, icon('quote', 18)),
              h('p', null, row.quote),
              h('div', { className: 'rd-quote-foot' },
                h('span', null, row.who),
                h('button', { type: 'button', className: 'rd-link-btn', onClick: () => copyText(row.quote).then(() => onNotify(t('toast.copied'))) }, t('app.copy')))),
            h('div', { className: 'rd-detail-block' },
              h('h4', null, t('detail.context')),
              h('p', null, row.scene),
              h('p', { className: 'rd-muted' }, row.pain)),
            h('div', { className: 'rd-detail-block' },
              h('h4', null, t('detail.metrics')),
              h('div', { className: 'rd-metric-grid' },
                h(Metric, { label: t('app.score'), value: row.score, hint: `${bandLabel(row.band)} · 建议 ${row.suggest}` }),
                h(Metric, { label: '影响人数', value: row.people.toLocaleString('zh-CN') }),
                h(Metric, { label: '商业价值', value: `${row.value}/5` }),
                h(Metric, { label: '战略契合', value: `${row.fit}/5` }),
                h(Metric, { label: '实现成本', value: `${row.cost}/5` }),
                h(Metric, { label: '证据置信', value: `${row.confidence}/5` }))),
            h('div', { className: 'rd-detail-block' },
              h('h4', null, t('detail.rubric')),
              h('div', { className: 'rd-rubric' },
                h(RubricBar, { label: t('review.dim.value'), value: row.value }),
                h(RubricBar, { label: t('review.dim.fit'), value: row.fit }),
                h(RubricBar, { label: t('review.dim.impact'), value: row.impact }),
                h(RubricBar, { label: t('review.dim.confidence'), value: row.confidence }),
                h(RubricBar, { label: t('review.dim.urgency'), value: row.urgency }),
                h(RubricBar, { label: t('review.dim.cost'), value: row.cost, invert: true }))),
            row.note ? h('div', { className: 'rd-detail-block' }, h('h4', null, t('detail.note')), h('p', { className: 'rd-muted' }, row.note)) : null,
            h('div', { className: 'rd-detail-block rd-decision' },
              h('h4', null, t('detail.decision')),
              h('div', { className: 'rd-form-row' },
                h('label', { className: 'rd-field' }, h('span', null, t('detail.priority')),
                  h('select', { value: priority, onChange: (event) => setPriority(event.target.value) }, PRIORITIES.map((p) => h('option', { key: p, value: p }, p)))),
                h('label', { className: 'rd-field' }, h('span', null, t('detail.status')),
                  h('select', { value: status, onChange: (event) => setStatus(event.target.value) }, STATUSES.map((s) => h('option', { key: s, value: s }, s))))),
              h('label', { className: 'rd-field' }, h('span', null, t('detail.conclusion')),
                h('textarea', { rows: 3, value: conclusion, placeholder: t('detail.emptyConclusion'), onChange: (event) => setConclusion(event.target.value) })),
              h('button', { type: 'button', className: 'rd-btn rd-btn-primary rd-btn-block', onClick: save, disabled: saving },
                icon('check', 15), saving ? t('detail.saving') : t('detail.save')))),
          h('footer', { className: 'rd-drawer-foot' },
            h('button', { type: 'button', className: cls('rd-btn rd-btn-soft', selected && 'is-on'), onClick: () => onToggle(row.id) }, selected ? t('app.added') : t('detail.add')),
            h('button', { type: 'button', className: 'rd-btn rd-btn-ghost', onClick: () => onCompose('prd', [row]) }, t('detail.prd'))))
      )
    }

    // ------------------------------------------------------------ composer --
    function Composer({ state, t, workspaces, onClose, onSend }) {
      const [mode, setMode] = useState(state.mode)
      const [prompt, setPrompt] = useState(state.prompt)
      const [dirty, setDirty] = useState(false)
      const [workspaceId, setWorkspaceId] = useState(state.workspaceId || workspaces?.[0]?.id || '')
      const template = useMemo(() => buildPrompt(state.records, mode, t), [state.records, mode, t])
      useEscape(onClose)
      useEffect(() => {
        if (!workspaceId && workspaces?.[0]?.id) setWorkspaceId(workspaces[0].id)
      }, [workspaces, workspaceId])
      useEffect(() => {
        if (!dirty) setPrompt(template)
      }, [template, dirty])
      const modeMeta = MODES.find((item) => item.id === mode) || MODES[0]

      const workspaceBlock = h('div', { className: 'rd-composer-block' },
        h('h4', null, t('composer.workspace')),
        workspaces && workspaces.length
          ? h('label', { className: 'rd-field rd-workspace-row' },
            h('select', { value: workspaceId, onChange: (event) => setWorkspaceId(event.target.value) },
              workspaces.map((item) => h('option', { key: item.id, value: item.id }, item.title))))
          : h('p', { className: 'rd-warn' }, t('composer.noWorkspace')))

      const context = h('div', { className: 'rd-composer-context' },
        h('span', { className: 'rd-muted' }, t('composer.context')),
        state.records.map((row) => h('span', { key: row.id, className: 'rd-context-chip' }, row.id, h('b', null, row.title))))

      const modeButtons = MODES.map((item) => h('button', {
        key: item.id,
        type: 'button',
        className: cls('rd-mode', mode === item.id && 'is-on'),
        onClick: () => setMode(item.id),
      },
        h('span', { className: 'rd-mode-icon' }, icon(item.icon, 18)),
        h('strong', null, t(`mode.${item.id}`)),
        h('span', null, t(`mode.${item.id}.desc`))))

      const modeBlock = h('div', { className: 'rd-composer-block' },
        h('h4', null, t('composer.mode')),
        h('div', { className: 'rd-mode-grid' }, modeButtons),
        h('p', { className: 'rd-note' }, icon('spark', 13), t('composer.modeNote')))

      const promptBlock = h('div', { className: 'rd-composer-block' },
        h('h4', null,
          t('composer.prompt'),
          h('span', { className: 'rd-muted' }, t('composer.promptHint')),
          dirty ? h('button', {
            type: 'button',
            className: 'rd-link-btn',
            onClick: () => { setPrompt(template); setDirty(false) },
          }, t('composer.applyTemplate')) : null),
        h('textarea', {
          className: 'rd-prompt',
          rows: 14,
          value: prompt,
          autoFocus: true,
          'aria-label': t('composer.prompt'),
          onChange: (event) => {
            const value = event.target.value
            setPrompt(value)
            setDirty(value !== template)
          },
        }))

      const note = h('p', { className: 'rd-note' }, icon('send', 14), t('composer.note'))
      const header = h('header', { className: 'rd-modal-head' },
        h('div', null,
          h('h2', null, t('composer.title')),
          h('p', null, t('composer.subtitle'))),
        h('button', { type: 'button', className: 'rd-icon-btn', onClick: onClose, 'aria-label': t('app.close') }, icon('close', 18)))
      const body = h('div', { className: 'rd-modal-body' }, workspaceBlock, context, modeBlock, promptBlock, note)
      const footer = h('footer', { className: 'rd-modal-foot' },
        h('button', { type: 'button', className: 'rd-btn rd-btn-ghost', onClick: onClose }, t('composer.cancel')),
        h('button', {
          type: 'button',
          className: 'rd-btn rd-btn-primary',
          disabled: !state.records.length || !workspaceId,
          onClick: () => onSend(prompt, modeMeta, workspaceId),
        }, icon('send', 16), t('composer.send')))

      return h('div', { className: 'rd-modal-layer' },
        h('div', { className: 'rd-backdrop', onClick: onClose }),
        h('div', { className: 'rd-modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': t('composer.title') },
          header, body, footer))
    }

    // -------------------------------------------------------------- toast --
    function Toast({ toast }) {
      if (!toast) return null
      return h('div', { className: `rd-toast rd-toast-${toast.tone || 'ok'}`, role: 'status' },
        icon(toast.tone === 'err' ? 'close' : 'check', 15), toast.msg)
    }

    // ---------------------------------------------------------------- desk --
    function Desk({ ctx, t, onLocaleChange }) {
      useLocaleTick(ctx)
      const [data, setData] = useState(null)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
      const [syncing, setSyncing] = useState(false)
      const [tab, setTab] = useState(() => {
        const saved = readStored(STORE.tab, 'inbox')
        return TABS.some((item) => item.id === saved) ? saved : 'inbox'
      })
      const [filters, setFilters] = useState(() => {
        const defaults = { q: '', sourceType: '', dept: '', priority: '', status: '', module: '', onlyHot: false }
        const saved = readStored(STORE.filters, defaults)
        return { ...defaults, ...(saved && typeof saved === 'object' ? saved : {}) }
      })
      const [sort, setSort] = useState(() => readStored(STORE.sort, 'score'))
      const [selected, setSelected] = useState(() => {
        const saved = readStored(STORE.selected, [])
        return new Set(Array.isArray(saved) ? saved : [])
      })
      const [detailId, setDetailId] = useState(null)
      const [composer, setComposer] = useState(null)
      const [toast, setToast] = useState(null)
      const alive = useRef(true)
      const workspaceItems = useWorkspaceItems(ctx)
      const workspaceOptions = useMemo(() => workspaceItems
        .filter((item) => item && item.workspaceId)
        .map((item) => ({
          id: item.workspaceId,
          title: item.title || item.path || item.workspaceId,
          path: item.path || '',
        })), [workspaceItems])

      const notify = useCallback((msg, tone = 'ok') => setToast({ msg, tone, id: Date.now() }), [])
      useEffect(() => {
        if (!toast) return undefined
        const timer = setTimeout(() => setToast(null), 3800)
        return () => clearTimeout(timer)
      }, [toast])

      const load = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
          const next = await api('/state')
          if (alive.current) setData(next)
        } catch (err) {
          if (alive.current) setError(err)
        } finally {
          if (alive.current) setLoading(false)
        }
      }, [])

      useEffect(() => {
        alive.current = true
        load()
        return () => { alive.current = false }
      }, [load])

      const records = useMemo(() => enrich(data?.records || []), [data])
      const byId = useMemo(() => new Map(records.map((row) => [row.id, row])), [records])
      const selectedRows = useMemo(() => records.filter((row) => selected.has(row.id)), [records, selected])
      const detail = detailId ? byId.get(detailId) : null

      useEffect(() => { writeStored(STORE.tab, tab) }, [tab])
      useEffect(() => { writeStored(STORE.filters, filters) }, [filters])
      useEffect(() => { writeStored(STORE.sort, sort) }, [sort])
      useEffect(() => { writeStored(STORE.selected, [...selected]) }, [selected])
      useEffect(() => {
        if (!records.length) return
        setSelected((prev) => {
          const next = new Set([...prev].filter((id) => byId.has(id)))
          return next.size === prev.size ? prev : next
        })
      }, [records, byId])

      const filtered = useMemo(() => {
        const q = filters.q.trim().toLowerCase()
        let list = records.filter((row) => {
          if (filters.sourceType && row.sourceType !== filters.sourceType) return false
          if (filters.dept && row.dept !== filters.dept) return false
          if (filters.priority && row.priority !== filters.priority) return false
          if (filters.status && row.status !== filters.status) return false
          if (filters.module && row.module !== filters.module) return false
          if (filters.onlyHot && !['P0', 'P1'].includes(row.priority)) return false
          if (!q) return true
          return [row.title, row.who, row.scene, row.pain, row.quote, row.source, row.module, row.dept, ...(row.tags || [])]
            .join(' ').toLowerCase().includes(q)
        })
        list.sort((a, b) => {
          if (sort === 'date') return String(b.date).localeCompare(String(a.date))
          if (sort === 'people') return b.people - a.people
          if (sort === 'priority') return PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority) || b.score - a.score
          return b.score - a.score
        })
        return list
      }, [records, filters, sort])
      const filteredIds = useMemo(() => new Set(filtered.map((row) => row.id)), [filtered])
      const hiddenSelected = selectedRows.filter((row) => !filteredIds.has(row.id)).length


      const toggle = useCallback((id) => {
        setSelected((prev) => {
          const next = new Set(prev)
          if (next.has(id)) next.delete(id)
          else next.add(id)
          return next
        })
      }, [])

      const clearSelection = useCallback(() => setSelected(new Set()), [])

      const openComposer = useCallback((mode, rows) => {
        const picked = (rows && rows.length ? rows : selectedRows)
        const fallback = [...records].sort((a, b) => b.score - a.score).slice(0, 3)
        const finalRows = picked.length ? picked : fallback
        if (!finalRows.length) { notify(t('composer.empty'), 'err'); return }
        setDetailId(null)
        setComposer({ mode, records: finalRows, prompt: buildPrompt(finalRows, mode, t), workspaceId: workspaceOptions[0]?.id || '' })
      }, [records, selectedRows, t, notify, workspaceOptions])

      const sync = useCallback(async () => {
        setSyncing(true)
        try {
          const next = await api('/sync', { method: 'POST' })
          setData(next)
          notify(t('app.synced', { n: next.records.length }))
        } catch (err) {
          const msg = err.hint ? `${err.message}｜${err.hint}` : err.message
          notify(t('toast.syncFail', { msg }), 'err')
        } finally {
          setSyncing(false)
        }
      }, [notify, t])

      const save = useCallback(async (patch) => {
        const result = await api('/update', { method: 'POST', body: JSON.stringify(patch) })
        setData((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            records: prev.records.map((row) => row.recordId === patch.recordId
              ? { ...row, priority: result.record?.priority ?? row.priority, status: result.record?.status ?? row.status, conclusion: result.record?.conclusion ?? row.conclusion }
              : row),
          }
        })
      }, [])

      const send = useCallback((prompt, modeMeta, workspaceId) => {
        const ui = ctx.get('uiWorkspace')
        if (!ui || typeof ui.startSession !== 'function') {
          notify(t('composer.noSession'), 'err')
          return
        }
        if (!workspaceId) {
          notify(t('composer.noWorkspace'), 'err')
          return
        }
        try {
          ui.startSession(workspaceId, { prompt, whenDraftExists: 'replace' })
          setComposer(null)
          notify(t('composer.sent'))
        } catch {
          notify(t('composer.noSession'), 'err')
        }
      }, [ctx, notify, t])

      const counts = useMemo(() => {
        const total = records.length
        const hot = records.filter((row) => ['P0', 'P1'].includes(row.priority)).length
        const waiting = records.filter((row) => row.status === '待评估').length
        const people = records.reduce((sum, row) => sum + row.people, 0)
        const avg = total ? Math.round(records.reduce((sum, row) => sum + row.score, 0) / total) : 0
        const week = records.filter((row) => {
          const time = new Date(row.date).getTime()
          return Number.isFinite(time) && Date.now() - time <= 7 * 864e5
        }).length
        return { total, hot, waiting, people, avg, week }
      }, [records])

      if (loading && !data) {
        return h('div', { className: 'rd-root' },
          h('div', { className: 'rd-loading' },
            h('div', { className: 'rd-spinner' }),
            h('h2', null, t('app.loading')),
            h('p', { className: 'rd-muted' }, '飞书多维表 · WorkBuddy 需求池')))
      }

      if (error && !data) {
        return h('div', { className: 'rd-root' },
          h('div', { className: 'rd-loading' },
            h('div', { className: 'rd-empty-mark' }, icon('link', 26)),
            h('h2', null, t('app.failed')),
            h('p', { className: 'rd-muted' }, error.message),
            h('button', { type: 'button', className: 'rd-btn rd-btn-primary', onClick: load }, t('app.retry'))))
      }

      return h('div', { className: 'rd-root' },
        h('header', { className: 'rd-head' },
          h('div', { className: 'rd-brand' },
            h('div', { className: 'rd-mark' }, icon('desk', 22)),
            h('div', null,
              h('h1', null, t('app.title')),
              h('p', null, t('app.subtitle')))),
          h('div', { className: 'rd-head-actions' },
            h('a', { className: 'rd-source', href: data?.baseUrl || '#', target: '_blank', rel: 'noreferrer' },
              h('span', { className: cls('rd-dot', data?.source === 'snapshot' ? 'is-mock' : data?.source === 'feishu' ? 'is-on' : 'is-cache') }),
              h('span', null, t('app.source')),
              h('b', null, records.length),
              h('span', { className: 'rd-source-time' }, data?.source === 'snapshot' ? t('app.snapshot') : relativeTime(data?.syncedAt)),
              icon('link', 13)),
            h('button', { type: 'button', className: 'rd-btn rd-btn-ghost', onClick: sync, disabled: syncing },
              icon('sync', 15), syncing ? t('app.syncing') : t('app.sync')))),
        h('nav', { className: 'rd-tabs', role: 'tablist', 'aria-label': t('app.title') },
          TABS.map((item) => h('button', {
            key: item.id, type: 'button', role: 'tab', 'aria-selected': tab === item.id ? 'true' : 'false',
            className: cls('rd-tab', tab === item.id && 'is-on'), onClick: () => setTab(item.id),
          },
            icon(item.icon, 16),
            h('span', null, t(item.key)),
            item.id === 'inbox' ? h('em', null, records.length) : null))) ,
        (tab === 'inbox' || tab === 'insights') ? h('div', { className: 'rd-kpis' },
          h(Kpi, { label: t('kpi.total'), value: counts.total, hint: data?.source === 'snapshot' ? t('app.snapshot') : `${t('app.source')} · ${relativeTime(data?.syncedAt)}` }),
          h(Kpi, { label: t('kpi.hot'), value: counts.hot, tone: 'error', onClick: () => { setTab('inbox'); setFilters((prev) => ({ ...prev, onlyHot: true })) } }),
          h(Kpi, { label: t('kpi.waiting'), value: counts.waiting, tone: 'warn', onClick: () => { setTab('inbox'); setFilters((prev) => ({ ...prev, status: '待评估' })) } }),
          h(Kpi, { label: t('kpi.people'), value: counts.people.toLocaleString('zh-CN'), hint: t('app.people') }),
          h(Kpi, { label: t('kpi.avg'), value: counts.avg, tone: 'brand' }),
          h(Kpi, { label: t('kpi.week'), value: counts.week, hint: '新提交' })) : null,
        h('main', { className: 'rd-scroll' },
          tab === 'inbox' ? h(Inbox, {
            rows: filtered, filters, setFilters, sort, setSort, selected, onToggle: toggle,
            onOpen: (row) => setDetailId(row.id), onClear: () => setFilters({ q: '', sourceType: '', dept: '', priority: '', status: '', module: '', onlyHot: false }),
            total: records.length, selectedCount: selectedRows.filter((row) => filtered.some((item) => item.id === row.id)).length,
            onSelectAll: () => setSelected((prev) => new Set([...prev, ...filtered.map((row) => row.id)])), t,
          }) : null,
          tab === 'insights' ? h(Insights, { rows: records, t }) : null,
          tab === 'review' ? h(Review, { rows: records, allRows: records, selected, t, onOpen: (row) => setDetailId(row.id), onCompose: openComposer, onNotify: notify }) : null,
          tab === 'prd' ? h(Prd, { rows: records, selected, t, onCompose: openComposer, onNotify: notify }) : null,
          tab === 'playbooks' ? h(Playbooks, { rows: records, selected, t, onCompose: openComposer }) : null),
        selected.size > 0 ? h('div', { className: 'rd-bottombar' },
          h('div', { className: 'rd-bottombar-left' },
            h('strong', null, t('selected.n', { n: selected.size })),
            h('span', { className: 'rd-muted' }, selectedRows.slice(0, 2).map((row) => row.id).join('、'), selected.size > 2 ? ` 等 ${selected.size} 条` : '', hiddenSelected > 0 ? ` · ${t('selected.hidden', { n: hiddenSelected })}` : ''),
            h('button', { type: 'button', className: 'rd-link-btn', onClick: clearSelection }, t('selected.clear'))),
          h('div', { className: 'rd-bottombar-actions' },
            h('button', { type: 'button', className: 'rd-btn rd-btn-ghost', onClick: () => openComposer('review', selectedRows) }, icon('gauge', 15), t('action.review')),
            h('button', { type: 'button', className: 'rd-btn rd-btn-soft', onClick: () => openComposer('prd', selectedRows) }, icon('doc', 15), t('action.prd')),
            h('button', { type: 'button', className: 'rd-btn rd-btn-primary', onClick: () => openComposer('analysis', selectedRows) }, icon('send', 15), t('action.compose')))) : null,
        detail ? h(DetailDrawer, {
          row: detail, t, selected: selected.has(detail.id), onClose: () => setDetailId(null),
          onToggle: toggle, onCompose: openComposer, onSave: save, onNotify: notify,
        }) : null,
        composer ? h(Composer, { state: composer, t, workspaces: workspaceOptions, onClose: () => setComposer(null), onSend: send }) : null,
        h(Toast, { toast })
      )
    }

    // --------------------------------------------------------------- apply --
    const CSS = `
      .rd-root{--rd-radius:12px;--rd-radius-sm:8px;--rd-line:var(--dsw-alias-border-l1);--rd-line-2:var(--dsw-alias-border-l2);height:100%;min-height:0;display:flex;flex-direction:column;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:13px;line-height:1.5;overflow:hidden}
      .rd-root *{box-sizing:border-box}
      .rd-root button,.rd-root input,.rd-root select,.rd-root textarea{font:inherit;color:inherit}
      .rd-root button{cursor:pointer}
      .rd-root a{color:inherit;text-decoration:none}
      .rd-head{flex:none;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 22px 12px;border-bottom:1px solid var(--rd-line);background:linear-gradient(120deg,color-mix(in srgb,var(--dsw-alias-brand-primary) 7%,transparent),transparent 46%),var(--dsw-alias-bg-base)}
      .rd-brand{display:flex;align-items:center;gap:12px;min-width:0}
      .rd-mark{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;flex:none;color:#fff;background:linear-gradient(135deg,var(--dsw-alias-brand-primary),color-mix(in srgb,var(--dsw-alias-brand-primary) 55%,var(--dsw-alias-state-success-primary)));box-shadow:0 6px 18px color-mix(in srgb,var(--dsw-alias-brand-primary) 24%,transparent)}
      .rd-brand h1{margin:0;font-size:21px;letter-spacing:-.02em;line-height:1.2}
      .rd-brand p{margin:3px 0 0;color:var(--dsw-alias-label-secondary);font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .rd-head-actions{display:flex;align-items:center;gap:8px;flex:none}
      .rd-source{display:inline-flex;align-items:center;gap:7px;height:32px;padding:0 10px;border:1px solid var(--rd-line-2);border-radius:999px;background:var(--dsw-alias-bg-layer-1);font-size:11.5px;color:var(--dsw-alias-label-secondary);transition:border-color .15s,background .15s}
      .rd-source:hover{border-color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2)}
      .rd-source b{color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums}
      .rd-dot{width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-state-idle-primary);flex:none}
      .rd-dot.is-on{background:var(--dsw-alias-state-success-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-state-success-primary) 18%,transparent)}
      .rd-dot.is-mock{background:var(--dsw-alias-state-warn-primary)}
      .rd-dot.is-cache{background:var(--dsw-alias-brand-primary)}
      .rd-source-time{color:var(--dsw-alias-label-secondary);font-size:10px;white-space:nowrap}
      .rd-tabs{flex:none;display:flex;gap:4px;padding:0 18px;border-bottom:1px solid var(--rd-line);overflow-x:auto;scrollbar-width:none}
      .rd-tabs::-webkit-scrollbar{display:none}
      .rd-tab{display:inline-flex;align-items:center;gap:7px;height:42px;padding:0 12px;border:0;border-bottom:2px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary);white-space:nowrap;font-size:12.5px}
      .rd-tab:hover{color:var(--dsw-alias-label-primary)}
      .rd-tab.is-on{color:var(--dsw-alias-label-primary);border-bottom-color:var(--dsw-alias-brand-primary);font-weight:600}
      .rd-tab em{font-style:normal;font-size:10px;min-width:18px;height:18px;padding:0 5px;display:inline-grid;place-items:center;border-radius:999px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
      .rd-kpis{flex:none;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;padding:12px 22px 4px}
      .rd-kpi{border:1px solid var(--rd-line);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:9px 11px 8px;text-align:left;min-width:0;position:relative;overflow:hidden}
      .rd-kpi:after{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:var(--dsw-alias-border-l2);opacity:.7}
      .rd-kpi-brand:after{background:var(--dsw-alias-brand-primary)}
      .rd-kpi-error:after{background:var(--dsw-alias-state-error-primary)}
      .rd-kpi-warn:after{background:var(--dsw-alias-state-warn-primary)}
      .rd-kpi-success:after{background:var(--dsw-alias-state-success-primary)}
      .rd-kpi-click:hover{border-color:var(--rd-line-2);background:var(--dsw-alias-bg-layer-2)}
      .rd-kpi-label{display:block;color:var(--dsw-alias-label-secondary);font-size:10.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .rd-kpi-value{display:block;font-size:20px;font-weight:720;letter-spacing:-.03em;line-height:1.15;margin-top:2px;font-variant-numeric:tabular-nums}
      .rd-kpi-hint{display:block;color:var(--dsw-alias-label-secondary);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
      .rd-scroll{flex:1;min-height:0;overflow:auto;padding:14px 22px 28px;overscroll-behavior:contain}
      .rd-stack{display:flex;flex-direction:column;gap:14px}
      .rd-grid{display:grid;gap:14px}
      .rd-grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}
      .rd-card{border:1px solid var(--rd-line);border-radius:var(--rd-radius);background:var(--dsw-alias-bg-layer-1);min-width:0;padding:14px 15px}
      .rd-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}
      .rd-card-title{margin:0;font-size:13.5px;letter-spacing:-.01em}
      .rd-card-sub{margin:3px 0 0;color:var(--dsw-alias-label-secondary);font-size:11px;line-height:1.45}
      .rd-card-actions{display:flex;gap:6px;flex:none}
      .rd-muted{color:var(--dsw-alias-label-secondary)}
      .rd-toolbar{display:flex;flex-wrap:wrap;gap:7px;align-items:center;margin-bottom:10px}
      .rd-search{display:flex;align-items:center;gap:7px;height:32px;min-width:250px;flex:1;max-width:380px;padding:0 10px;border:1px solid var(--rd-line-2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary)}
      .rd-search input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--dsw-alias-label-primary);font-size:12px}
      .rd-select-wrap{display:inline-flex;align-items:center;gap:5px;height:32px;padding:0 8px;border:1px solid var(--rd-line-2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);font-size:11.5px}
      .rd-select-label{color:var(--dsw-alias-label-secondary);white-space:nowrap}
      .rd-select-wrap select{border:0;outline:0;background:transparent;color:var(--dsw-alias-label-primary);font-size:11.5px;max-width:120px}
      .rd-sort{margin-left:auto}
      .rd-toggle{display:inline-flex;align-items:center;gap:5px;height:32px;padding:0 10px;border:1px solid var(--rd-line-2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font-size:11.5px}
      .rd-toggle.is-on{border-color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));color:var(--dsw-alias-label-primary)}
      .rd-active-filters{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 10px;font-size:11px}
      .rd-filter-chip{display:inline-flex;align-items:center;gap:5px;border:1px solid color-mix(in srgb,var(--dsw-alias-brand-primary) 30%,var(--rd-line-2));border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-brand-primary) 8%,transparent);color:var(--dsw-alias-label-primary);padding:2px 8px;font-size:11px}
      .rd-filter-chip span{color:var(--dsw-alias-label-secondary)}
      .rd-link-btn{display:inline-flex;align-items:center;gap:4px;border:0;background:transparent;color:var(--dsw-alias-brand-primary);padding:2px 4px;font-size:11.5px}
      .rd-link-btn:hover{text-decoration:underline}
      .rd-list-meta{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 7px;color:var(--dsw-alias-label-secondary);font-size:10.5px}
      .rd-list-meta .rd-link-btn:disabled{opacity:.5;cursor:default;text-decoration:none}
      .rd-list{display:flex;flex-direction:column;gap:8px}
      .rd-row{display:grid;grid-template-columns:22px minmax(0,1fr) auto;gap:11px;align-items:start;border:1px solid var(--rd-line);border-radius:var(--rd-radius);background:var(--dsw-alias-bg-layer-1);padding:11px 12px;transition:border-color .15s,background .15s,box-shadow .15s;min-width:0;cursor:pointer}
      .rd-row:hover{border-color:var(--rd-line-2);background:var(--dsw-alias-bg-layer-2);box-shadow:0 3px 14px color-mix(in srgb,var(--dsw-alias-label-secondary) 8%,transparent)}
      .rd-row-selected{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 50%,var(--rd-line));background:color-mix(in srgb,var(--dsw-alias-brand-primary) 5%,var(--dsw-alias-bg-layer-1))}
      .rd-check{display:flex;align-items:center;padding-top:2px;cursor:pointer}
      .rd-check input{position:absolute;opacity:0;width:1px;height:1px}
      .rd-check-box{width:17px;height:17px;border:1.5px solid var(--rd-line-2);border-radius:5px;display:grid;place-items:center;background:var(--dsw-alias-bg-base);color:#fff;flex:none}
      .rd-check input:checked+.rd-check-box{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary)}
      .rd-check input:focus-visible+.rd-check-box{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
      .rd-row-main{min-width:0}
      .rd-row-top{display:flex;align-items:center;flex-wrap:wrap;gap:6px;min-width:0}
      .rd-row-id{font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border-radius:4px;padding:1px 5px;flex:none}
      .rd-row-title{margin:0;font-size:13px;font-weight:650;letter-spacing:-.01em;min-width:0;overflow-wrap:anywhere}
      .rd-pri{display:inline-flex;align-items:center;height:19px;padding:0 6px;border-radius:5px;font-size:10px;font-weight:700;letter-spacing:.02em;border:1px solid transparent;flex:none}
      .rd-pri-p0{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 36%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 9%,transparent)}
      .rd-pri-p1{color:var(--dsw-alias-state-warn-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 36%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 9%,transparent)}
      .rd-pri-p2{color:var(--dsw-alias-brand-primary);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 32%,transparent);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 8%,transparent)}
      .rd-pri-p3{color:var(--dsw-alias-label-secondary);border-color:var(--rd-line-2);background:var(--dsw-alias-bg-layer-2)}
      .rd-status{display:inline-flex;align-items:center;height:19px;padding:0 6px;border-radius:5px;font-size:10px;border:1px solid var(--rd-line-2);color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);flex:none}
      .rd-status-active{color:var(--dsw-alias-brand-primary);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 30%,transparent)}
      .rd-status-planned{color:var(--dsw-alias-state-warn-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 30%,transparent)}
      .rd-status-building{color:var(--dsw-alias-state-warn-primary)}
      .rd-status-done{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 30%,transparent)}
      .rd-status-hold{opacity:.65}
      .rd-row-meta{display:flex;flex-wrap:wrap;align-items:center;gap:5px 10px;color:var(--dsw-alias-label-secondary);font-size:10.5px;margin-top:4px}
      .rd-row-meta b{color:var(--dsw-alias-label-primary);font-weight:600}
      .rd-src{display:inline-flex;align-items:center;gap:5px;color:var(--dsw-alias-label-primary)}
      .rd-src i{font-style:normal;opacity:.45}
      .rd-row-quote{margin:6px 0 0;color:var(--dsw-alias-label-secondary);font-size:11.5px;line-height:1.55;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere}
      .rd-quote-mark{color:var(--dsw-alias-brand-primary);font-weight:700}
      .rd-row-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}
      .rd-pill{display:inline-flex;align-items:center;height:19px;padding:0 6px;border-radius:5px;border:1px solid var(--rd-line-2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font-size:10px;white-space:nowrap}
      .rd-pill-brand{color:var(--dsw-alias-brand-primary);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 26%,transparent);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 7%,transparent)}
      .rd-pill-quiet{background:transparent}
      .rd-pill-success{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 30%,transparent)}
      .rd-pill-muted{opacity:.55;border-style:dashed}
      .rd-row-side{display:flex;align-items:center;gap:12px;flex:none}
      .rd-score-wrap{display:flex;align-items:center;gap:7px}
      .rd-score-copy{display:flex;flex-direction:column;gap:1px;min-width:42px}
      .rd-score-label{font-size:9.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
      .rd-score-band{font-size:12px;font-weight:700}
      .rd-band-high{color:var(--dsw-alias-state-success-primary)}
      .rd-band-mid{color:var(--dsw-alias-brand-primary)}
      .rd-band-watch{color:var(--dsw-alias-state-warn-primary)}
      .rd-band-low{color:var(--dsw-alias-label-secondary)}
      .rd-ring{border-radius:50%;display:grid;place-items:center;flex:none;position:relative}
      .rd-ring:after{content:"";position:absolute;inset:5px;border-radius:50%;background:var(--dsw-alias-bg-layer-1)}
      .rd-ring-inner{position:relative;z-index:1;font-size:11.5px;font-weight:720;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary)}
      .rd-row-actions{display:flex;gap:5px}
      .rd-btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;height:30px;padding:0 10px;border-radius:7px;border:1px solid transparent;font-size:11.5px;white-space:nowrap;transition:background .15s,border-color .15s,color .15s,opacity .15s}
      .rd-btn:disabled{opacity:.55;cursor:default}
      .rd-btn-primary{background:var(--dsw-alias-button-primary-fill,var(--dsw-alias-brand-primary));color:#fff;border-color:transparent}
      .rd-btn-primary:hover:enabled{filter:brightness(1.06)}
      .rd-btn-soft{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,transparent);color:var(--dsw-alias-brand-primary);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 24%,transparent)}
      .rd-btn-soft:hover,.rd-btn-soft.is-on{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,transparent)}
      .rd-btn-ghost{background:transparent;color:var(--dsw-alias-label-secondary);border-color:var(--rd-line-2)}
      .rd-btn-ghost:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2)}
      .rd-btn-block{width:100%}
      .rd-icon-btn{width:30px;height:30px;display:grid;place-items:center;border:1px solid var(--rd-line-2);border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary)}
      .rd-icon-btn:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2)}
      .rd-bottombar{flex:none;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 22px;border-top:1px solid var(--rd-line-2);background:color-mix(in srgb,var(--dsw-alias-bg-overlay) 92%,transparent);backdrop-filter:blur(10px);box-shadow:0 -8px 24px color-mix(in srgb,var(--dsw-alias-label-secondary) 7%,transparent)}
      .rd-bottombar-left{display:flex;align-items:center;gap:10px;min-width:0}
      .rd-bottombar-left strong{font-size:12px;white-space:nowrap}
      .rd-bottombar-actions{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
      .rd-page-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-wrap:wrap}
      .rd-page-title{margin:0;font-size:20px;letter-spacing:-.02em}
      .rd-page-sub{margin:4px 0 0;color:var(--dsw-alias-label-secondary);font-size:11.5px;line-height:1.5;max-width:720px}
      .rd-page-actions{display:flex;gap:6px;flex-wrap:wrap}
      .rd-soft-badge{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0 9px;border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 9%,transparent);color:var(--dsw-alias-state-success-primary);font-size:11px}
      .rd-kpis-4{grid-template-columns:repeat(4,minmax(0,1fr));padding:0}
      .rd-bars{display:flex;flex-direction:column;gap:7px}
      .rd-bar-row{min-width:0}
      .rd-bar-head{display:flex;align-items:baseline;justify-content:space-between;gap:10px;font-size:11px}
      .rd-bar-label{color:var(--dsw-alias-label-primary);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
      .rd-bar-count{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;flex:none}
      .rd-bar-count em{font-style:normal;opacity:.7}
      .rd-bar-track{height:5px;border-radius:3px;background:var(--dsw-alias-bg-layer-2);overflow:hidden;margin-top:3px}
      .rd-bar-fill{height:100%;border-radius:3px;background:var(--dsw-alias-brand-primary)}
      .rd-mini-divider{height:1px;background:var(--rd-line);margin:11px 0}
      .rd-matrix-wrap{overflow:auto}
      .rd-matrix{width:100%;min-width:460px;height:auto;display:block}
      .rd-axis-text{fill:var(--dsw-alias-label-secondary);font-size:10px;font-family:inherit}
      .rd-axis-title{fill:var(--dsw-alias-label-secondary);font-size:10px;font-family:inherit}
      .rd-quadrant-label{fill:var(--dsw-alias-label-secondary);font-size:10px;opacity:.7;font-family:inherit}
      .rd-matrix-id{fill:var(--dsw-alias-label-secondary);font-size:8px;font-family:var(--ds-font-family-code,ui-monospace,monospace)}
      .rd-matrix-dot circle{transition:opacity .15s}
      .rd-matrix-dot:hover circle{opacity:1}
      .rd-clusters{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
      .rd-cluster{text-align:left;border:1px solid var(--rd-line);border-radius:9px;background:var(--dsw-alias-bg-layer-2);padding:9px 10px;min-width:0}
      .rd-cluster:hover{border-color:var(--rd-line-2);background:var(--dsw-alias-bg-layer-1)}
      .rd-cluster-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
      .rd-cluster-top strong{font-size:12px}
      .rd-cluster-count{font-size:10px;color:var(--dsw-alias-label-secondary)}
      .rd-cluster-meta{font-size:10px;color:var(--dsw-alias-label-secondary);margin-top:2px}
      .rd-cluster-quote{margin:5px 0 0;font-size:10.5px;color:var(--dsw-alias-label-primary);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.4}
      .rd-cluster-tags{display:flex;gap:3px;flex-wrap:wrap;margin-top:5px}
      .rd-signals{display:flex;flex-direction:column;gap:6px}
      .rd-signal{border:1px solid var(--rd-line);border-left:3px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-2);padding:7px 9px}
      .rd-signal-success{border-left-color:var(--dsw-alias-state-success-primary)}
      .rd-signal-error{border-left-color:var(--dsw-alias-state-error-primary)}
      .rd-signal-warn{border-left-color:var(--dsw-alias-state-warn-primary)}
      .rd-signal-head{display:flex;align-items:center;justify-content:space-between;gap:10px}
      .rd-signal-head strong{font-size:11px}
      .rd-signal-head b{font-size:15px;font-variant-numeric:tabular-nums}
      .rd-signal p{margin:3px 0 0;font-size:10.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .rd-review-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
      .rd-review-card{border:1px solid var(--rd-line);border-radius:var(--rd-radius);background:var(--dsw-alias-bg-layer-1);padding:12px;min-width:0}
      .rd-review-top{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}
      .rd-review-title{margin:5px 0 2px;font-size:13px;line-height:1.35}
      .rd-review-score{display:flex;flex-direction:column;align-items:center;gap:3px;flex:none}
      .rd-review-score>span{font-size:9.5px;color:var(--dsw-alias-label-secondary);display:flex;flex-direction:column;align-items:center;gap:0}
      .rd-review-score b{font-size:12px;color:var(--dsw-alias-brand-primary)}
      .rd-rubric{display:flex;flex-direction:column;gap:4px;margin:9px 0}
      .rd-rubric-row{display:grid;grid-template-columns:68px minmax(0,1fr) 34px;align-items:center;gap:7px}
      .rd-rubric-label{font-size:10px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
      .rd-rubric-track{height:4px;border-radius:3px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}
      .rd-rubric-fill{height:100%;border-radius:3px;background:var(--dsw-alias-brand-primary)}
      .rd-rubric-fill[data-invert="true"]{background:var(--dsw-alias-state-success-primary)}
      .rd-rubric-value{text-align:right;font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
      .rd-review-quote{margin:6px 0 0;padding:7px 9px;border-radius:7px;background:var(--dsw-alias-bg-layer-2);font-size:10.5px;color:var(--dsw-alias-label-secondary);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      .rd-review-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:7px}
      .rd-review-foot>span{font-size:10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
      .rd-memo{margin:0;padding:12px;border-radius:8px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--rd-line);font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:11px;line-height:1.65;white-space:pre-wrap;max-height:300px;overflow:auto;color:var(--dsw-alias-label-secondary)}
      .rd-prd-layout{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:14px;align-items:start}
      .rd-prd-main{min-width:0}
      .rd-field{display:flex;flex-direction:column;gap:5px;font-size:11px;color:var(--dsw-alias-label-secondary)}
      .rd-input,.rd-field select,.rd-field textarea,.rd-prompt{width:100%;border:1px solid var(--rd-line-2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);padding:8px 10px;outline:0;color:var(--dsw-alias-label-primary);font-size:12px;resize:vertical}
      .rd-input:focus,.rd-field select:focus,.rd-field textarea:focus,.rd-prompt:focus{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,transparent)}
      .rd-input-lg{font-size:14px;font-weight:600;margin-bottom:10px}
      .rd-doc{border:1px solid var(--rd-line);border-radius:var(--rd-radius);background:var(--dsw-alias-bg-layer-1);padding:20px 22px}
      .rd-doc-meta{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
      .rd-doc-meta span{font-size:10px;color:var(--dsw-alias-label-secondary);border:1px solid var(--rd-line);border-radius:999px;padding:2px 7px}
      .rd-doc-section{margin:0 0 15px}
      .rd-doc-section:last-child{margin-bottom:0}
      .rd-doc-section h3{margin:0 0 6px;font-size:13px;color:var(--dsw-alias-label-primary)}
      .rd-doc-section p{margin:4px 0;font-size:11.5px;line-height:1.7;color:var(--dsw-alias-label-secondary)}
      .rd-doc-bullet{padding-left:10px;position:relative}
      .rd-doc-bullet:before{content:"";position:absolute;left:0;top:8px;width:3px;height:3px;border-radius:50%;background:var(--dsw-alias-brand-primary)}
      .rd-note{display:flex;align-items:flex-start;gap:5px;color:var(--dsw-alias-label-secondary);font-size:10.5px;line-height:1.5;margin:10px 0 0}
      .rd-prd-side{border:1px solid var(--rd-line);border-radius:var(--rd-radius);background:var(--dsw-alias-bg-layer-1);padding:12px;position:sticky;top:6px}
      .rd-prd-side h4{margin:0 0 8px;font-size:11.5px}
      .rd-prd-list{display:flex;flex-direction:column;gap:5px}
      .rd-prd-item{text-align:left;border:1px solid var(--rd-line);border-radius:7px;background:var(--dsw-alias-bg-layer-2);padding:6px 7px;display:flex;flex-direction:column;gap:1px}
      .rd-prd-item:hover{border-color:var(--rd-line-2)}
      .rd-prd-item-id{font-family:var(--ds-font-family-code,ui-monospace,monospace);font-size:9px;color:var(--dsw-alias-label-secondary)}
      .rd-prd-item strong{font-size:10.5px;line-height:1.35}
      .rd-prd-item span:last-child{font-size:9.5px}
      .rd-playbook-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
      .rd-playbook{border:1px solid var(--rd-line);border-radius:var(--rd-radius);background:var(--dsw-alias-bg-layer-1);padding:13px;display:flex;flex-direction:column;gap:7px;min-width:0}
      .rd-playbook:hover{border-color:var(--rd-line-2);box-shadow:0 5px 18px color-mix(in srgb,var(--dsw-alias-label-secondary) 8%,transparent)}
      .rd-playbook-icon{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,transparent);color:var(--dsw-alias-brand-primary)}
      .rd-playbook h3{margin:0;font-size:13px}
      .rd-playbook p{margin:0;font-size:10.5px;line-height:1.55;color:var(--dsw-alias-label-secondary);flex:1}
      .rd-playbook-output{display:flex;align-items:center;gap:5px;font-size:10px;color:var(--dsw-alias-label-secondary)}
      .rd-playbook-sources{display:flex;flex-wrap:wrap;gap:3px}
      .rd-datasources{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
      .rd-datasource{display:flex;align-items:center;gap:8px;border:1px solid var(--rd-line);border-radius:8px;background:var(--dsw-alias-bg-layer-2);padding:7px 8px;min-width:0}
      .rd-datasource>div{display:flex;flex-direction:column;min-width:0;flex:1}
      .rd-datasource strong{font-size:11px}
      .rd-datasource span:not(.rd-dot):not(.rd-pill){font-size:9.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .rd-datasource .rd-pill{flex:none}
      .rd-idea-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
      .rd-idea{display:flex;align-items:center;gap:6px;border:1px dashed var(--rd-line-2);border-radius:8px;padding:7px 9px;font-size:10px;color:var(--dsw-alias-label-secondary)}
      .rd-drawer-layer,.rd-modal-layer{position:fixed;inset:0;z-index:80;display:flex}
      .rd-backdrop{position:absolute;inset:0;background:color-mix(in srgb,var(--dsw-alias-label-primary) 28%,transparent);backdrop-filter:blur(2px)}
      .rd-drawer{position:relative;margin-left:auto;width:min(520px,94vw);height:100%;background:var(--dsw-alias-bg-overlay);border-left:1px solid var(--rd-line-2);box-shadow:-20px 0 50px color-mix(in srgb,var(--dsw-alias-label-primary) 16%,transparent);display:flex;flex-direction:column;animation:rd-slide .18s ease-out}
      @keyframes rd-slide{from{transform:translateX(18px);opacity:.6}to{transform:none;opacity:1}}
      .rd-drawer-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:16px 18px 12px;border-bottom:1px solid var(--rd-line)}
      .rd-drawer-head h2{margin:5px 0 0;font-size:16px;line-height:1.35}
      .rd-drawer-body{flex:1;overflow:auto;padding:14px 18px 20px}
      .rd-detail-meta{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px}
      .rd-quote-card{border:1px solid color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,var(--rd-line));border-radius:10px;background:linear-gradient(135deg,color-mix(in srgb,var(--dsw-alias-brand-primary) 8%,transparent),transparent 70%);padding:12px}
      .rd-quote-icon{color:var(--dsw-alias-brand-primary)}
      .rd-quote-card p{margin:5px 0 0;font-size:13px;line-height:1.6;color:var(--dsw-alias-label-primary)}
      .rd-quote-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:7px;font-size:10.5px;color:var(--dsw-alias-label-secondary)}
      .rd-detail-block{margin-top:15px}
      .rd-detail-block h4{margin:0 0 6px;font-size:11.5px;color:var(--dsw-alias-label-secondary);letter-spacing:.02em}
      .rd-detail-block p{margin:0 0 4px;font-size:11.5px;line-height:1.6}
      .rd-metric-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
      .rd-metric{border:1px solid var(--rd-line);border-radius:8px;background:var(--dsw-alias-bg-layer-1);padding:7px 8px;display:flex;flex-direction:column}
      .rd-metric-label{font-size:9.5px;color:var(--dsw-alias-label-secondary)}
      .rd-metric-value{font-size:16px;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
      .rd-metric-hint{font-size:9px;color:var(--dsw-alias-label-secondary)}
      .rd-decision{border-top:1px solid var(--rd-line);padding-top:14px}
      .rd-form-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}
      .rd-drawer-foot{flex:none;display:flex;gap:7px;justify-content:flex-end;padding:10px 18px;border-top:1px solid var(--rd-line);background:var(--dsw-alias-bg-layer-1)}
      .rd-modal-layer{align-items:center;justify-content:center;padding:24px}
      .rd-modal{position:relative;width:min(900px,96vw);max-height:90vh;display:flex;flex-direction:column;border:1px solid var(--rd-line-2);border-radius:14px;background:var(--dsw-alias-bg-overlay);box-shadow:0 24px 70px color-mix(in srgb,var(--dsw-alias-label-primary) 24%,transparent);overflow:hidden}
      .rd-modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:15px 18px 11px;border-bottom:1px solid var(--rd-line)}
      .rd-modal-head h2{margin:0;font-size:17px}
      .rd-modal-head p{margin:3px 0 0;font-size:11px;color:var(--dsw-alias-label-secondary)}
      .rd-modal-body{overflow:auto;padding:14px 18px}
      .rd-composer-context{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:12px;font-size:10.5px}
      .rd-context-chip{display:inline-flex;align-items:center;gap:5px;max-width:320px;border:1px solid var(--rd-line-2);border-radius:6px;background:var(--dsw-alias-bg-layer-2);padding:2px 6px;font-size:10px;color:var(--dsw-alias-label-secondary);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
      .rd-context-chip b{font-weight:500;color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis}
      .rd-composer-block{margin-bottom:13px}
      .rd-workspace-row{max-width:460px}
      .rd-warn{color:var(--dsw-alias-state-warn-primary);font-size:11px;margin:0}
      .rd-composer-block h4{display:flex;align-items:baseline;gap:8px;margin:0 0 7px;font-size:11.5px;color:var(--dsw-alias-label-secondary)}
      .rd-mode-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
      .rd-mode{text-align:left;border:1px solid var(--rd-line);border-radius:9px;background:var(--dsw-alias-bg-layer-1);padding:8px 9px;display:flex;flex-direction:column;gap:3px}
      .rd-mode:hover{border-color:var(--rd-line-2)}
      .rd-mode.is-on{border-color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 8%,var(--dsw-alias-bg-layer-1));box-shadow:0 0 0 1px color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,transparent)}
      .rd-mode-icon{color:var(--dsw-alias-brand-primary)}
      .rd-mode strong{font-size:11.5px}
      .rd-mode span:last-child{font-size:9.5px;color:var(--dsw-alias-label-secondary);line-height:1.45}
      .rd-prompt{font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10.5px;line-height:1.6;min-height:180px;max-height:40vh}
      .rd-modal-foot{display:flex;justify-content:flex-end;gap:7px;padding:10px 18px;border-top:1px solid var(--rd-line);background:var(--dsw-alias-bg-layer-1)}
      .rd-toast{position:fixed;right:22px;bottom:22px;z-index:120;display:flex;align-items:center;gap:7px;max-width:min(420px,90vw);padding:9px 12px;border:1px solid var(--rd-line-2);border-radius:9px;background:var(--dsw-alias-bg-overlay);box-shadow:0 12px 30px color-mix(in srgb,var(--dsw-alias-label-primary) 16%,transparent);font-size:11.5px;animation:rd-toast .18s ease-out}
      .rd-toast-ok{color:var(--dsw-alias-label-primary);border-left:3px solid var(--dsw-alias-state-success-primary)}
      .rd-toast-err{border-left:3px solid var(--dsw-alias-state-error-primary)}
      @keyframes rd-toast{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}
      .rd-loading{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--dsw-alias-label-secondary);text-align:center}
      .rd-loading h2{margin:0;font-size:16px;color:var(--dsw-alias-label-primary)}
      .rd-spinner{width:28px;height:28px;border-radius:50%;border:2.5px solid var(--dsw-alias-bg-layer-2);border-top-color:var(--dsw-alias-brand-primary);animation:rd-spin .8s linear infinite}
      @keyframes rd-spin{to{transform:rotate(360deg)}}
      .rd-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:34px 16px;border:1px dashed var(--rd-line-2);border-radius:var(--rd-radius);color:var(--dsw-alias-label-secondary);text-align:center;font-size:11.5px}
      .rd-empty strong{color:var(--dsw-alias-label-primary);font-size:13px}
      .rd-empty p{margin:0;max-width:460px}
      .rd-empty-mark{width:46px;height:46px;display:grid;place-items:center;border-radius:13px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-brand-primary);margin-bottom:3px}
      @media (max-width:1100px){.rd-kpis{grid-template-columns:repeat(3,minmax(0,1fr))}.rd-playbook-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.rd-prd-layout{grid-template-columns:minmax(0,1fr)}.rd-prd-side{position:static}}
      @media (max-width:860px){.rd-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.rd-grid-2,.rd-review-grid{grid-template-columns:minmax(0,1fr)}.rd-row{grid-template-columns:22px minmax(0,1fr)}.rd-row-side{grid-column:2;justify-content:space-between;width:100%}.rd-row-actions{justify-content:flex-end}.rd-clusters{grid-template-columns:minmax(0,1fr)}.rd-mode-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.rd-datasources{grid-template-columns:minmax(0,1fr)}.rd-idea-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.rd-bottombar{align-items:flex-start;flex-direction:column}.rd-bottombar-actions{width:100%;justify-content:flex-start}.rd-sort{margin-left:0}.rd-head{align-items:flex-start;flex-direction:column}.rd-head-actions{width:100%;justify-content:space-between}}
      @media (max-width:560px){.rd-kpis{grid-template-columns:repeat(2,minmax(0,1fr));padding:10px 12px 2px}.rd-scroll{padding:10px 12px 20px}.rd-head,.rd-tabs,.rd-bottombar{padding-left:12px;padding-right:12px}.rd-playbook-grid,.rd-mode-grid{grid-template-columns:minmax(0,1fr)}.rd-form-row,.rd-metric-grid{grid-template-columns:1fr 1fr}.rd-search{min-width:100%}.rd-toolbar{gap:5px}.rd-brand p{white-space:normal}.rd-drawer{width:100vw}.rd-modal-layer{padding:8px}}
      /* Flat monochrome: neutral surfaces, one accent, small radii, quiet shadows. */
      .rd-root{--dsw-alias-brand-primary:#3450E4;--dsw-alias-state-success-primary:#3450E4;--dsw-alias-state-error-primary:var(--dsw-alias-label-primary);--dsw-alias-state-warn-primary:var(--dsw-alias-label-secondary);--dsw-alias-state-idle-primary:var(--dsw-alias-label-secondary);--rd-radius:6px;--rd-radius-sm:4px}
      .rd-head{background:var(--dsw-alias-bg-base);padding:14px 22px 10px}
      .rd-mark{width:38px;height:38px;border-radius:6px;background:#3450E4;background-image:none;box-shadow:none}
      .rd-brand h1{font-size:19px}
      .rd-source{height:30px;padding:0 9px;border-radius:4px}
      .rd-btn{height:29px;padding:0 9px;border-radius:4px}
      .rd-btn-primary{background:#3450E4;color:#fff;box-shadow:none;border-color:transparent}
      .rd-btn-primary:hover:enabled{background:#2b43c7;filter:none}
      .rd-btn-soft{background:color-mix(in srgb,#3450E4 8%,transparent);border-color:color-mix(in srgb,#3450E4 24%,var(--rd-line-2));color:var(--dsw-alias-brand-primary)}
      .rd-btn-soft:hover,.rd-btn-soft.is-on{background:color-mix(in srgb,#3450E4 13%,transparent)}
      .rd-btn-ghost{border-color:var(--rd-line-2);color:var(--dsw-alias-label-secondary)}
      .rd-icon-btn{border-radius:4px}
      .rd-toggle,.rd-select-wrap,.rd-search{border-radius:4px}
      .rd-tab{height:38px}
      .rd-tab.is-on{border-bottom-color:#3450E4}
      .rd-tab em{border-radius:3px}
      .rd-kpis{padding-top:10px}
      .rd-kpi{border-radius:5px;box-shadow:none;padding:7px 10px 6px}
      .rd-kpi:after{display:none}
      .rd-kpi-value{font-size:19px}
      .rd-card{border-radius:6px;box-shadow:none;padding:12px 13px}
      .rd-card-head{margin-bottom:8px}
      .rd-row{border-radius:6px;box-shadow:none;padding:10px 11px}
      .rd-row:hover{box-shadow:none;background:var(--dsw-alias-bg-layer-2)}
      .rd-row-selected{background:color-mix(in srgb,#3450E4 5%,var(--dsw-alias-bg-layer-1));border-color:color-mix(in srgb,#3450E4 42%,var(--rd-line-2))}
      .rd-check-box{border-radius:3px}
      .rd-pri{border-radius:3px;font-weight:600}
      .rd-pri-p0{color:#3450E4;border-color:color-mix(in srgb,#3450E4 38%,transparent);background:transparent}
      .rd-pri-p1,.rd-pri-p2,.rd-pri-p3{color:var(--dsw-alias-label-secondary);border-color:var(--rd-line-2);background:transparent}
      .rd-status{border-radius:3px;color:var(--dsw-alias-label-secondary);border-color:var(--rd-line-2);background:transparent}
      .rd-status-active{color:#3450E4;border-color:color-mix(in srgb,#3450E4 34%,transparent)}
      .rd-status-planned,.rd-status-building,.rd-status-done{color:var(--dsw-alias-label-primary);border-color:var(--rd-line-2)}
      .rd-status-hold{opacity:.6}
      .rd-pill{border-radius:3px}
      .rd-pill-brand,.rd-pill-success{color:#3450E4;border-color:color-mix(in srgb,#3450E4 26%,transparent);background:transparent}
      .rd-pill-muted{opacity:.55;border-style:dashed}
      .rd-filter-chip{border-radius:3px;border-color:color-mix(in srgb,#3450E4 26%,var(--rd-line-2));background:transparent}
      .rd-filter-chip span{color:var(--dsw-alias-label-secondary)}
      .rd-link-btn{color:#3450E4}
      .rd-score-band{font-weight:600}
      .rd-band-high,.rd-band-mid{color:var(--dsw-alias-label-primary)}
      .rd-band-watch,.rd-band-low{color:var(--dsw-alias-label-secondary)}
      .rd-bars .rd-bar-fill{background:#3450E4}
      .rd-bottombar{padding:8px 22px;background:var(--dsw-alias-bg-layer-1);backdrop-filter:none;box-shadow:none;border-top-color:var(--rd-line-2)}
      .rd-matrix-dot circle{opacity:.78}
      .rd-cluster{border-radius:6px}
      .rd-signal{border-radius:6px;border-left-width:2px}
      .rd-signal-success{border-left-color:#3450E4}
      .rd-signal-error,.rd-signal-warn{border-left-color:var(--rd-line-2)}
      .rd-review-card{border-radius:6px}
      .rd-rubric-track{height:3px;border-radius:2px}
      .rd-rubric-fill{border-radius:2px;background:#3450E4}
      .rd-rubric-fill[data-invert="true"]{background:var(--dsw-alias-label-secondary)}
      .rd-memo{border-radius:5px}
      .rd-input,.rd-field select,.rd-field textarea,.rd-prompt,.rd-input-lg{border-radius:4px}
      .rd-doc{border-radius:6px;padding:18px 20px}
      .rd-prd-side{border-radius:6px}
      .rd-prd-item{border-radius:4px}
      .rd-playbook{border-radius:6px;box-shadow:none}
      .rd-playbook:hover{box-shadow:none;background:var(--dsw-alias-bg-layer-2)}
      .rd-playbook-icon{width:30px;height:30px;border-radius:5px;background:var(--dsw-alias-bg-layer-2);color:#3450E4}
      .rd-datasource{border-radius:4px}
      .rd-idea{border-radius:4px}
      .rd-quote-card{border-radius:6px;background:transparent;border-color:var(--rd-line-2)}
      .rd-metric{border-radius:4px}
      .rd-modal{border-radius:8px;box-shadow:0 6px 24px rgba(0,0,0,.12)}
      .rd-modal-head{padding:14px 18px 10px}
      .rd-mode{border-radius:4px}
      .rd-mode.is-on{background:color-mix(in srgb,#3450E4 6%,transparent);box-shadow:none}
      .rd-mode-icon{color:#3450E4}
      .rd-composer-block h4{gap:6px}
      .rd-context-chip{border-radius:3px}
      .rd-drawer{border-left:1px solid var(--rd-line-2);box-shadow:-6px 0 20px rgba(0,0,0,.06)}
      .rd-drawer-head{padding:14px 18px 10px}
      .rd-drawer-foot{background:var(--dsw-alias-bg-layer-1)}
      .rd-toast{border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.12)}
      .rd-toast-ok{border-left:2px solid #3450E4}
      .rd-toast-err{border-left:2px solid var(--dsw-alias-label-primary)}
      .rd-empty{border-radius:6px}
      .rd-empty-mark{width:40px;height:40px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);color:#3450E4}
      .rd-spinner{border-top-color:#3450E4}

    `

    const STYLE_ID = 'requirements-desk/desk.css'
    function installStyles() {
      if (typeof document === 'undefined') return () => {}
      const existing = document.querySelector(`style[data-plugin-css="${STYLE_ID}"]`)
      if (existing) return () => {}
      const style = document.createElement('style')
      style.dataset.plugin = 'requirements-desk'
      style.dataset.pluginCss = STYLE_ID
      style.textContent = CSS
      document.head.appendChild(style)
      return () => { try { style.remove() } catch { /* ignore */ } }
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh: DICT.zh, en: DICT.en }), 'requirements-desk: dictionaries')
      ctx.effect(() => installStyles(), 'requirements-desk: styles')
      const t = makeT(ctx)
      const Page = () => h(Desk, { ctx, t })
      ctx.slots.inject('main', () => ctx.slots.register(
        { name: 'main', key: 'requirements-desk', locale: NS },
        Page,
      ))
      ctx.slots.inject('sidebar.panellist', () => ctx.slots.register(
        { name: 'sidebar.panellist', id: 'requirements-desk', order: 26, label: () => t('app.title'), locale: NS },
        (props) => icon('desk', typeof props?.size === 'number' ? props.size : 20),
      ))
    }

    return { inject: ['slots', 'locale'], apply }
  },
})
