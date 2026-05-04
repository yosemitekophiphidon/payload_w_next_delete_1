import { seedAdmin } from "./seeders/admin.seeder";
// ---------


async function main(){
    console.log('--------------------------------------------------------------------------')
    try {
        await seedAdmin();
        process.exit(0);
    } catch (err){
        console.error(err);
        process.exit(1);
    }
}

void main();