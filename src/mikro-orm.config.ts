import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import {MikroORM } from "@mikro-orm/core";
import path from 'path'
import { User } from "./entities/User";
export default {
    migrations:{
        path: path.join(__dirname, "./migrations"), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post, User],
    user: 'postgres',
    password: 'password',
    dbName: 'postgres',
    type: 'postgresql',
    clientUrl: 'postgresql://localhost:5432',
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];