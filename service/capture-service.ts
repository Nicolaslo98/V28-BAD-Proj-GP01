import { Knex } from "knex";

export class CaptureService {

    constructor(private knex: Knex) {

    }
    //sample
    // async userSetUp() {
    //     const result = await this.knex.select("*").from("building").where("is_public", "true").andWhere("is_publish", "true").orderBy("created_at", "desc");
    //     return result
    // } 

}