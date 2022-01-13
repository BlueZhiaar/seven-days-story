'use strict';
const { database } = require('pg/lib/defaults');
const { Sequelize, DataTypes, INTEGER, STRING } = require('sequelize');
const UUIDV4 = require('uuid4');
const sequelize = new Sequelize(
  'postgres://postgres:postgres@db/seven-days-story',
  {
    logging: false
  }
);

const Users = sequelize.define(
  'Users',
  {
    user_id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

const Charas = sequelize.define(
  'Charas',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: Users,
        key: 'user_id'
      }
    },
    user_name: {
      type:DataTypes.STRING
    },
    charas_name: {
      type: DataTypes.STRING
    },
  },

  {
    freezeTableName: true,
    timestamps: true
  }
);

const CharaData = sequelize.define(
  'CharaData',
  {
    chara_name: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: Charas,
        key: 'charas_name'
      }
    },
    story_id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4
    },
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

const StoryData = sequelize.define(
  'StoryData',
  {
    story_data_id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true,
      references: {
        model: CharaData,
        key: 'story_id'
      }
    },
    episodes_log: {
      type: DataTypes.STRING
    },
    policy: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    luck: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

Users.sync();
Charas.sync();
CharaData.sync();
StoryData.sync();
module.exports =  Users,Charas,CharaData,StoryData;