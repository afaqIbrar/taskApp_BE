module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("task", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending',
            validate: {
                isIn: [['pending', 'complete']],
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });

    Task.associate = (models) => {
        Task.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };

    return Task;
};
