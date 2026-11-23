// DSH falls back to English for locales not supplied by the connector.
const text = (en, zh) => ({ en, zh });
export const COPY = {
  title: text('MindMux account', 'MindMux 账号'),
  connect: text('Connect MindMux', '连接 MindMux'),
  activation: {
    title: text('Connect your MindMux account', '连接你的 MindMux 账号'),
    body: text('Connect MindMux to use your accessible Cloud Brains in conversations.', '连接 MindMux，在对话中使用你有权限访问的 Cloud Brain。'),
  },
  detail: {
    disconnected: text('Connect MindMux to discover, read, and update Cloud Brain knowledge.', '连接 MindMux 以查找、读取和更新 Cloud Brain 知识。'),
    waitingBrowser: text('Complete authorization in MindMux, then return here.', '请在 MindMux 完成授权，然后返回这里。'),
    authorizing: text('Finishing authorization with MindMux.', '正在完成 MindMux 授权。'),
    connecting: text('Connecting to MindMux.', '正在连接 MindMux。'),
    connected: text('Ask the agent to use MindMux in a conversation.', '可以在对话中请 Agent 使用 MindMux。'),
    rejected: text('MindMux no longer accepts this authorization. Connect again.', 'MindMux 不再接受当前授权，请重新连接。'),
    scope: text('Required permissions are missing. Connect again and review the permissions.', '当前授权缺少必要权限，请重新连接并确认权限。'),
  },
  signOut: {
    title: text('Sign out of MindMux?', '退出 MindMux 登录？'),
    body: text('This deletes the MindMux authorization saved by this DSH host. It does not sign you out of the MindMux website or revoke other clients.', '这会删除当前 DSH 主机保存的 MindMux 授权，不会退出 MindMux 网页登录或撤销其他客户端。'),
  },
  notice: {
    connected: text('MindMux connected', 'MindMux 已连接'),
    signedOut: text('Signed out of MindMux', '已退出 MindMux 登录'),
  },
};
