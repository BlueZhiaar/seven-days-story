# seven-days-story

 SequelizeDatabaseError: there is no unique constraint matching given keys for referenced table "Charas"というエラーが出たので、defauleValueを削除してみた。
 UnhandledPromiseRejectionWarning: SequelizeDatabaseError: relation "CharaData" does not existが出た。
 const sequelize = new Sequelize(
  'postgres://postgres:postgres@db/seven-days-story',
  {
    logging: false,
     //ここの部分を足した
    define: {
       
      freezeTableName: true,
      timestamps: true
    }
  }
);
が、エラーは変化なし。

catchで囲むことにする。
https://techblog.yahoo.co.jp/programming/javascript_error/
https://zenn.dev/arei/articles/6f3d0e9a617272
を参考にする。

例
const timer = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('非同期的なエラー'))
    }, 1000)
  })
}

timer()
  .catch((error) => console.error(error.message))
  .finally(() => console.log('この行は実行されます'))

  テーブル名をシングルでなくダブルクオーテーションで囲んでみた。
  (node:108) UnhandledPromiseRejectionWarning: SequelizeDatabaseError: there is no unique constraint matching given keys for referenced table "Charas"
    at Query.formatError (/seven-days-story/node_modules/sequelize/lib/dialects/postgres/query.js:386:16)
    at Query.run (/seven-days-story/node_modules/sequelize/lib/dialects/postgres/query.js:87:18)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
    at async /seven-days-story/node_modules/sequelize/lib/sequelize.js:619:16
    at async PostgresQueryInterface.createTable (/seven-days-story/node_modules/sequelize/lib/dialects/abstract/query-interface.js:225:12)
    at async Function.sync (/seven-days-story/node_modules/sequelize/lib/model.js:1300:5)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:108) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handl
ed with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id
: 1)
(node:108) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
(node:108) UnhandledPromiseRejectionWarning: SequelizeDatabaseError: relation "CharaData" does not exist
    at Query.formatError (/seven-days-story/node_modules/sequelize/lib/dialects/postgres/query.js:386:16)
    at Query.run (/seven-days-story/node_modules/sequelize/lib/dialects/postgres/query.js:87:18)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
    at async /seven-days-story/node_modules/sequelize/lib/sequelize.js:619:16
    at async PostgresQueryInterface.createTable (/seven-days-story/node_modules/sequelize/lib/dialects/abstract/query-interface.js:225:12)
    at async Function.sync (/seven-days-story/node_modules/sequelize/lib/model.js:1300:5)
(node:108) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handl
ed with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id
: 2)

CHaras.idに
unique:true,
を追加。

(node:298) UnhandledPromiseRejectionWarning: SequelizeDatabaseError: relation "CharaData" does not exist
    at Query.formatError (/seven-days-story/node_modules/sequelize/lib/dialects/postgres/query.js:386:16)
    at Query.run (/seven-days-story/node_modules/sequelize/lib/dialects/postgres/query.js:87:18)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
    at async /seven-days-story/node_modules/sequelize/lib/sequelize.js:619:16
    at async PostgresQueryInterface.createTable (/seven-days-story/node_modules/sequelize/lib/dialects/abstract/query-interface.js:225:12)
    at async Function.sync (/seven-days-story/node_modules/sequelize/lib/model.js:1300:5)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:298) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handl
ed with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id
: 1)
(node:298) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
(node:298) UnhandledPromiseRejectionWarning: SequelizeDatabaseError: there is no unique constraint matching given keys for referenced table "Charas"
    at Query.formatError (/seven-days-story/node_modules/sequelize/lib/dialects/postgres/query.js:386:16)
    at Query.run (/seven-days-story/node_modules/sequelize/lib/dialects/postgres/query.js:87:18)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
    at async /seven-days-story/node_modules/sequelize/lib/sequelize.js:619:16
    at async PostgresQueryInterface.createTable (/seven-days-story/node_modules/sequelize/lib/dialects/abstract/query-interface.js:225:12)
    at async Function.sync (/seven-days-story/node_modules/sequelize/lib/model.js:1300:5)
(node:298) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handl
ed with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id
: 2)
にエラーが変化。
User.sync({ alter: true }) -これにより、データベース内のテーブルの現在の状態（テーブルの列、データ型など）がチェックされ、モデルと一致するようにテーブルで必要な変更が実行されます。

UUID
UUIDの場合は、を使用しますDataTypes.UUID。UUIDPostgreSQLとSQLite、およびCHAR(36)MySQLのデータ型になります。Sequelizeは、これらのフィールドのUUIDを自動的に生成できます。単に、DataTypes.UUIDV1またはDataTypes.UUIDV4デフォルト値として使用します。

{
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
}

Users.sync();
Charas.sync();
CharaData.sync();
StoryData.sync();
これを
(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();
これに書き換え。
テーブル構造をまるまる変えた。
