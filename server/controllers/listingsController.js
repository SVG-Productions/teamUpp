const Listing = require("../models/Listing");
const unirest = require("unirest");
const cheerio = require("cheerio");

const createListing = async (req, res, next) => {
  try {
    const { salaryAmount, salaryFrequency } = req.body;
    if (salaryAmount && !salaryFrequency) {
      return res.status(400).json({
        message: "You must supply a frequency with the salary amount!",
      });
    }
    if (!salaryAmount && salaryFrequency) {
      return res.status(400).json({
        message: "You must supply an amount with the salary frequency!",
      });
    }
    const listing = await Listing.createListing(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const getSingleListing = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.getSingleListing(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }
    const comments = await Listing.getListingComments(listingId);
    const experiences = await Listing.getListingExperiences(listingId);

    res.status(200).json({ ...listing, comments, experiences });
  } catch (error) {
    next(error);
  }
};

const updateListing = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.updateListing(listingId, req.body);
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const deletedListing = await Listing.deleteListing(listingId);
    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found." });
    }
    res.status(200).json({ message: "Listing successfully deleted." });
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { listingId } = req.params;
    const addedFavorite = await Listing.addFavorite(id, listingId);

    res.status(201).json(addedFavorite);
  } catch (error) {
    next(error);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { listingId } = req.params;
    const deletedFavorite = await Listing.deleteFavorite(id, listingId);
    if (!deletedFavorite) {
      return res.status(404).json({ message: "Favorite not found." });
    }
    res.status(200).json({ message: "Favorite successfully deleted." });
  } catch (error) {
    next(error);
  }
};

const scrapeLinkedInPosting = async (req, res, next) => {
  let { url } = req.body;
  const jobId = url.split("/").pop();

  let response1 = await unirest
    .get(`https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/${jobId}`)
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    });
  const $ = cheerio.load(response1.body);
  const listingId = `linkedin-${jobId}`;

  const response2 = await fetch(
    `https://www.linkedin.com/voyager/api/jobs/jobPostings/${jobId}?decorationId=com.linkedin.voyager.deco.jobs.web.shared.WebFullJobPosting-65&topN=1&topNRequestedFlavors=List(TOP_APPLICANT,IN_NETWORK,COMPANY_RECRUIT,SCHOOL_RECRUIT,HIDDEN_GEM,ACTIVELY_HIRING_COMPANY)`,
    {
      headers: {
        accept: "application/vnd.linkedin.normalized+json+2.1",
        "accept-language": "en-US,en;q=0.9",
        "csrf-token": "ajax:0976976533846938833",
        "sec-ch-ua":
          '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-li-deco-include-micro-schema": "true",
        "x-li-lang": "en_US",
        "x-li-page-instance":
          "urn:li:page:d_flagship3_job_details;YCgPgFdAS2yCpiSy3t5QFg==",
        "x-li-pem-metadata": "Voyager - Careers - Job Details=job-posting",
        "x-li-track":
          '{"clientVersion":"1.12.8893","mpVersion":"1.12.8893","osName":"web","timezoneOffset":-7,"timezone":"America/Los_Angeles","deviceFormFactor":"DESKTOP","mpName":"voyager-web","displayDensity":1,"displayWidth":1920,"displayHeight":1080}',
        "x-restli-protocol-version": "2.0.0",
        cookie:
          'li_sugr=e97543f7-f96e-4eaf-96c8-b4571b002345; bcookie="v=2&2b655697-f5bb-449c-8a75-3262d137cd70"; bscookie="v=1&20230222030019ea8bf78f-8d65-4f92-8b12-7fe110b88a16AQFzHZqOulfcvbF93_vT67O6IWQtfl8a"; G_ENABLED_IDPS=google; aam_uuid=90087602306681572830680958195765502150; g_state={"i_l":0}; liap=true; JSESSIONID="ajax:0976976533846938833"; timezone=America/Los_Angeles; li_theme=light; li_theme_set=app; _gcl_au=1.1.963381522.1677037635; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; _guid=6735f156-4f19-4e07-914e-ea69ac9509e4; at_check=true; s_fid=5D36B1ECB6650B1B-352643F37353D556; s_cc=true; li_at=AQEDATq0WlIBHV90AAABiN_LDPMAAAGJJ-D2blYAD047wECOtZphiXXTaMCo8sxiOPei60_4lhZc9VeoVL_CUg1Wf9OcuhPIAE19kdkXO3C9EHDUn1vOhImAHMy7HdajCpelx00K3UZ-0DIHIFblUTSG; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19540%7CMCMID%7C90642381372668443280701454212219573005%7CMCAAMLH-1688790399%7C9%7CMCAAMB-1688790399%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1688192799s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1723062655; ln_or=eyIxNDUwNzY0IjoiZCIsIjQzNDYxMzciOiJkIn0%3D; s_sq=%5B%5BB%5D%5D; SID=ce330ade-6d9d-46da-8061-6610e7762ad6; VID=V_2023_07_01_20_41934; s_ips=961; gpv_pn=developer.linkedin.com%2F; s_tp=2516; s_ppv=developer.linkedin.com%2F%2C38%2C38%2C961%2C1%2C2; mbox=PC#39b2495a5e574abeb802cde1cd88b52d.35_0#1703796793|session#b61b678877fd470cae47f307af22c410#1688246653; s_plt=0.50; s_pltp=developer.linkedin.com%2F; s_tslv=1688244795113; PLAY_LANG=en; lang=v=2&lang=en-US; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InNlc3Npb25faWQiOiJjNmQ1YjM0ZS1mZjZhLTRjNTEtYmFlZC0zMzkzODhjZDUwMWF8MTY4ODI0NDgzMSIsImFsbG93bGlzdCI6Int9IiwicmVjZW50bHktc2VhcmNoZWQiOiIiLCJyZWZlcnJhbC11cmwiOiJodHRwczovL3d3dy5saW5rZWRpbi5jb20vZGV2ZWxvcGVycy9hcHBzL25ldyIsImFpZCI6IiIsInJlY2VudGx5LXZpZXdlZCI6IjU0ODM2MHw1NDM4NTIiLCJDUFQtaWQiOiLClk7DhsK7c2HDjsK0XHUwMDE0diB3wr_Di1x1MDAxNVx1MDAxMCIsImZsb3dUcmFja2luZ0lkIjoiK0ZyeEQvMmNRd1drMEk1cWV3WDZ3Zz09IiwiZXhwZXJpZW5jZSI6ImVudGl0eSIsInRyayI6IiJ9LCJuYmYiOjE2ODgyNDQ4NjksImlhdCI6MTY4ODI0NDg2OX0.k2Jl04QEKjfybyuHzdi51kwZyXjfbW6s87HD2yTJJ9s; AnalyticsSyncHistory=AQJV47gumQRHAgAAAYkUEJZHR1zbX_V-e2nEDQuJcYwEfxfs3-BRCW0_DOOV9cchQWHKnfYeOuAY05LfHCOD1g; lms_ads=AQEy8dMB_PCjYQAAAYkUEJbDgR2OnChOzdYXIqnLbExs7owrU1HmShcY9VHYDQZJOyUbSrC2F3s0TpDwWCPL9BPDN8o73ZaQ; lms_analytics=AQEy8dMB_PCjYQAAAYkUEJbDgR2OnChOzdYXIqnLbExs7owrU1HmShcY9VHYDQZJOyUbSrC2F3s0TpDwWCPL9BPDN8o73ZaQ; UserMatchHistory=AQJuELKGwEIWDAAAAYkUInjR3gOc-_rHEck067rwMMltqILE3YD5_STAvNVDvjw1YctZgVYuBXu8N4NT0QJQwrnxtuH1yY1GH9R4YXbMpWIFp-qXaC20aotd7fhVw1wFCdgJezaXiNeVxNQtH1ELTeK11ClcfjXG9tXrjUzafBtl78GkLU0wCBgK42iOFBgRTLFmTlGvME-OxdDkAtvuya6ARjS0powHTG3i_oRkrX_1vgUQAwK30_5w53lO9cusZaX52ETEjuBH0xU1zFGLEKH2HpbvQCKsCivLCI_agygvoeZvuPL1bUd3Peh7pXyXl4RQz3IABEw3lepAUukPVkfCf308vW4; lidc="b=OB30:s=O:r=O:a=O:p=O:g=3851:u=463:x=1:i=1688259950:t=1688305949:v=2:sig=AQFCbIn5cS9IcjeUyU17jm7Y8ZrHVsBR"; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19540%7CMCMID%7C90642381372668443280701454212219573005%7CMCAAMLH-1688864750%7C9%7CMCAAMB-1688864750%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1688267150s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1723062655; sdsc=1%3A1SZM1shxDNbLt36wZwCgPgvN58iw%3D',
        Referer: "https://www.linkedin.com/jobs/view/3643100642/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );

  const { data } = await response2.json();
  // const jobTitle = $(".topcard__title").text().trim();
  const jobTitle = data.title;
  const jobLink = url;
  const companyName = $(".topcard__org-name-link").text().trim();
  // const jobDescription = $(".description__text>section>div>em").html();
  const jobDescription = data.description.text;
  const companyDetails = data.companyDescription?.text || null;
  const salaryAmount = data.salaryInsights.insightExists
    ? data.salaryInsights.compensationBreakdown[0].minSalary
    : null;
  const salaryFrequency = data.salaryInsights.insightExists
    ? data.salaryInsights.compensationBreakdown[0].payPeriod
    : null;

  res.status(200).json({
    message: "Listing successfully scraped.",
    data: {
      listingId,
      jobTitle,
      jobLink,
      companyName,
      jobDescription,
      companyDetails,
      salaryAmount,
      salaryFrequency,
    },
  });
};

module.exports = {
  createListing,
  getSingleListing,
  deleteListing,
  updateListing,
  addFavorite,
  deleteFavorite,
  scrapeLinkedInPosting,
};
