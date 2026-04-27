import { app} from "@infrastructure/app";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import "reflect-metadata"; 

AppDataSource.initialize()
.then(()=>{
    console.log("Database connected");
    console.log(`Server running on port ${process.env.PORT}`);
})
.catch((err)=>{
    console.error("Can't connect database");
    process.exit(1);
});

export default{
    port:process.env.PORT?Number(process.env.PORT):3000,
    fetch: app.fetch
};