const knex = require("../../dbConfig");

const listingData = [
  {
    id: "33333333-3333-3333-3333-000000000001",
    user_id: "11111111-1111-1111-1111-000000000001",
    job_title: "Junior React Developer",
    job_link: "www.google.com",
    company_name: "Google",
    company_details:
      "Company focusing on search engine technology, advertising, cloud computing, e-commerce, artificial intelligence, and computer software.",
    job_description: "Develop react components for Google's home page",
    status_id: knex("application_statuses")
      .where("user_id", "11111111-1111-1111-1111-000000000001")
      .andWhere("app_status", "1st interview")
      .select("id"),
    index: 0,
    accepted: true,
  },
  {
    id: "33333333-3333-3333-3333-000000000002",
    user_id: "11111111-1111-1111-1111-000000000001",
    job_title: "Junior React Developer",
    job_link: "www.google.com",
    company_name: "Apple",
    company_details:
      "Company focusing on search engine technology, advertising, cloud computing, e-commerce, artificial intelligence, and computer software.",
    job_description: "Develop react components for Google's home page",
    status_id: knex("application_statuses")
      .where("user_id", "11111111-1111-1111-1111-000000000001")
      .andWhere("app_status", "applied")
      .select("id"),
    index: 0,
    accepted: false,
  },
  {
    id: "33333333-3333-3333-3333-000000000003",
    user_id: "11111111-1111-1111-1111-000000000002",
    job_title: "Junior React Developer",
    job_link: "www.google.com",
    company_name: "Netflix",
    company_details:
      "Company focusing on search engine technology, advertising, cloud computing, e-commerce, artificial intelligence, and computer software.",
    job_description: "Develop react components for Google's home page",
    status_id: knex("application_statuses")
      .where("user_id", "11111111-1111-1111-1111-000000000002")
      .andWhere("app_status", "applied")
      .select("id"),
    index: 0,
    accepted: false,
  },
  {
    id: "33333333-3333-3333-3333-000000000004",
    user_id: "11111111-1111-1111-1111-000000000002",
    job_title: "Junior React Developer",
    job_link: "www.google.com",
    company_name: "Facebook",
    company_details:
      "Company focusing on search engine technology, advertising, cloud computing, e-commerce, artificial intelligence, and computer software.",
    job_description: "Develop react components for Google's home page",
    status_id: knex("application_statuses")
      .where("user_id", "11111111-1111-1111-1111-000000000002")
      .andWhere("app_status", "1st interview")
      .select("id"),
    index: 0,
    accepted: true,
  },
  {
    id: "33333333-3333-3333-3333-000000000005",
    user_id: "11111111-1111-1111-1111-000000000003",
    job_title: "Code Monkey",
    job_link: "www.twitter.com",
    company_name: "Twitter",
    company_details: "Company focusing on tearing apart the fabric of society",
    job_description: "Hit keys. Make code.",
    status_id: knex("application_statuses")
      .where("user_id", "11111111-1111-1111-1111-000000000003")
      .andWhere("app_status", "applied")
      .select("id"),
    index: 0,
    accepted: false,
  },
  {
    id: "33333333-3333-3333-3333-000000000006",
    user_id: "11111111-1111-1111-1111-000000000001",
    job_title: "Full stack dev",
    job_link: "www.amazon.com",
    company_name: "Amazon",
    company_details:
      "Company focusing on tearing apart the fabric of society. GOGO BEZOS",
    job_description: "Hit keys. Make code.",
    status_id: knex("application_statuses")
      .where("user_id", "11111111-1111-1111-1111-000000000001")
      .andWhere("app_status", "applied")
      .select("id"),
    index: 1,
    accepted: false,
  },
  {
    id: "33333333-3333-3333-3333-000000000007",
    user_id: "11111111-1111-1111-1111-000000000001",
    job_title: "Backend developer",
    job_link: "www.wayfair.com",
    company_name: "Wayfair",
    company_details: "Company focusing on tearing apart the fabric of society",
    job_description: "Hit keys. Make code.",
    status_id: knex("application_statuses")
      .where("user_id", "11111111-1111-1111-1111-000000000001")
      .andWhere("app_status", "applied")
      .select("id"),
    index: 2,
    accepted: false,
  },
  {
    id: "33333333-3333-3333-3333-000000000008",
    user_id: "11111111-1111-1111-1111-000000000001",
    job_title: "Code Monkey",
    job_link: "www.twitter.com",
    company_name: "HelloFresh",
    company_details: "Company focusing on tearing apart the fabric of society",
    job_description: "Hit keys. Make code.",
    status_id: knex("application_statuses")
      .where("user_id", "11111111-1111-1111-1111-000000000001")
      .andWhere("app_status", "applied")
      .select("id"),
    index: 3,
    accepted: false,
  },
];

module.exports = listingData;
