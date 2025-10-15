module.exports =  (sequelize, DataTypes ) => {

    const record = sequelize.define('record', {
        isVerified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue:false
        },  
        level: {
          type: DataTypes.FLOAT,
          allowNull: true,
          defaultValue:0
        },     
      })

      return record
}
