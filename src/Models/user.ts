
import { DataTypes, Model } from "sequelize";
import IUser from "../Interfaces/user";
import {sequelize} from "../Database/db_config"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


class User extends Model<IUser> {
    public id!: number | undefined;
    public username!: string;
    public email!: string;
    public password!: string;
    public createdAt!: Date | undefined;
    public updatedAt!: Date | undefined;

    //hashed password before saving a new user
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    //is the provided password matches  the users hashed password
    async comparePassword(candidatePassword: string): Promise<boolean>{
        return await bcrypt.compare(candidatePassword, this.password);
    }

    //Generate a token for user auth
    generateAuthToken(): string {
        const token = jwt.sign(
            {id: this.id, email:this.email}, process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "1d",
            }
        );
        return token;
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'users',
    sequelize,
    hooks: {
        //password should be hash before saving a new user
        beforeCreate: async(user: User) => {
            await user.hashPassword()
        },
    }
},

);



export default User;



