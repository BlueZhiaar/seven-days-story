'use strict';
const { database } = require('pg/lib/defaults');
const { Sequelize, DataTypes, INTEGER, STRING } = require('sequelize');
const UUIDV4 = require('uuid4');
const sequelize = new Sequelize(
  'postgres://postgres:postgres@db/seven-days-story',
  {
    logging: false,
  }
);

const UserData = sequelize.define(
  'UserData',
  {
    user_names: {
      type:DataTypes.STRING,
      primaryKey:true
    }
  },
  {
    freezeTableName:true,
    timestamps: true
  }
)


const CharaData = sequelize.define(
  'CharaData',
  {
    user_name: {
      type:DataTypes.STRING,
      primaryKey:true,
      references: {
        model: UserData,
        key: 'user_names'
      }
    },
    chara_names: {
      type:DataTypes.STRING
    }
  },
  {
    freezeTableName:true,
    timestamps: true
  }
)

const StoryList = sequelize.define(
  'StoryList',
  {
    story_ids:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
    },
    chara_name: {
      type:DataTypes.STRING,
      primaryKey:true,
      references: {
        model: CharaData,
        key: 'chara_names'
      }
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
)

const StoryData = sequelize.define(
  'StoryData',
  {
    story_id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      references: {
        model: StoryList,
        key: 'story_ids'
      }
    },
      episode_logs: {
        type:DataTypes.STRING
      },
      policy: {
        type:DataTypes.STRING
      },
      luck: {
        type:DataTypes.INTEGER
      }
    },
    {
      freezeTableName:true,
      timestamps:true
    }
)



UserData.sync();
CharaData.sync();
StoryList.sync();
StoryData.sync();



module.exports =  UserData,CharaData,StoryList,StoryData;