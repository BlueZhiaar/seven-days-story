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

const CharaData = sequelize.define(
  'CharaData',
  {
    story_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    chara_name: {
      type:DataTypes.STRING
    },
    user_name: {
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



const StoryData = sequelize.define(
  'StoryData',
  {
    story_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      references: {
        model: CharaData,
        key: 'story_id'
      }
    },
    story_chain: {
      type:DataTypes.STRING
    }
  },
  {
    freezeTableName:true,
    timestamps:true
  }
)

const EpisodeData = sequelize.define(
  'EpisodeData',
  {
    episode_id: {
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    episode_body: {
      type:DataTypes.STRING
    }
  },
  {
    freezeTableName:true,
    timestamps:true
  }
)

const EndingData = sequelize.define(
  'EndingData',
  {
    ending_id: {
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true
    },
    ending_body: {
      type:DataTypes.STRING
    }
  },
  {
    freezeTableName:true,
    timestamps:true
  }
)



/*
UserData.sync();
CharaData.sync();
StoryList.sync();
StoryData.sync();
*/

CharaData.sync();
StoryData.sync();
EpisodeData.sync();
EndingData.sync();



module.exports = CharaData,StoryData,EpisodeData,EndingData;