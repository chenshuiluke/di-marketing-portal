import React, { useState, useMemo } from "react";
import Layout from "../components/Layout";
import * as styles from "./../components/modules/url-builder.module.css";
import Select from "react-select";
import axios from "axios";
const leadSourceOptions = [
  { value: "marketing", label: "marketing" },
  { value: "event", label: "event" },
  { value: "partner", label: "partner" },
  { value: "education", label: "education" },
  { value: "customer_connect_program", label: "customer_connect_program" },
];

const marketingSourceOptions = [
  { value: "ppc", label: "ppc" },
  { value: "website", label: "website" },
  { value: "email", label: "email" },
  { value: "social_media", label: "social_media" },
  // { value: "customer_marketing", label: "customer_marketing" },
  { value: "podcast", label: "podcast" },
  { value: "webinar", label: "webinar" },
  { value: "content", label: "content" },
  { value: "in_product", label: "in_product" },
  { value: "ae_referral", label: "ae_referral" },
];

const eventSourceOptions = [
  { value: "website", label: "website" },
  { value: "email", label: "email" },
  { value: "social_media", label: "social_media" },
  {
    value: "event_list",
    label: "event_list",
  },
  {
    value: "sponsored_speaker",
    label: "sponsored_speaker",
  },
];

const educationSourceOptions = [
  { value: "education_content", label: "education_content" },
];

const partnerSourceOptions = [
  { value: "website", label: "website" },
  { value: "email", label: "email" },
  { value: "webinar", label: "webinar" },
  { value: "podcast", label: "podcast" },
  { value: "social_media", label: "social_media" },
  { value: "content", label: "content" },
  { value: "in_product", label: "in_product" },
  // { value: "partner_blog", label: "partner_blog" },
  // { value: "partner_referral", label: "partner_referral" },
  // {
  //   value: "partner_growth_report",
  //   label: "partner_growth_report",
  // },
  // {
  //   value: "partner_free_trial",
  //   label: "partner_free_trial",
  // },
];

const ppcMediumOptions = [
  { value: "google", label: "google" },
  { value: "microsoft_ads", label: "microsoft_ads" },
  { value: "capterra", label: "capterra" },
  { value: "g2", label: "g2" },
  { value: "sourceforge", label: "sourceforge" },
];

const websiteMediumOptions = [
  { value: "main_website", label: "main_website" },
  { value: "blog", label: "blog" },
  { value: "chat_bot", label: "chat_bot" },
  { value: "content_landing_page", label: "content_landing_page" },
  // { value: "series_title", label: "series_title" },
];

const contentDownloadMediumOptions = [
  { value: "ebook", label: "ebook" },
  { value: "press_release", label: "press_release" },
];

const emailMediumOptions = [
  { value: "paid_email", label: "paid_email" },
  { value: "marketing_email", label: "marketing_email" },
  { value: "customer_email", label: "customer_email" },
];

const socialMediumOptions = [
  { value: "meta_ads", label: "meta_ads" },
  { value: "linkedin_ads", label: "linkedin_ads" },
  { value: "facebook", label: "facebook" },
  { value: "instagram", label: "instagram" },
  { value: "twitter", label: "twitter" },
  { value: "linkedin", label: "linkedin" },
  {
    value: "sponsored_social",
    label: "sponsored_social",
  },
];

const eventSocialMediumOptions = [
  { value: "facebook", label: "facebook" },
  { value: "instagram", label: "instagram" },
  { value: "twitter", label: "twitter" },
  { value: "linkedin", label: "linkedin" },
];

const partnerEmailMediumOptions = [
  {
    value: "paid_email",
    label: "paid_email",
  },
  {
    value: "marketing_email",
    label: "marketing_email",
  },
  {
    value: "customer_email",
    label: "customer_email",
  },
];

const partnerWebsiteMediumOptions = [
  {
    value: "main_website",
    label: "main_website",
  },
  {
    value: "blog",
    label: "blog",
  },
  {
    value: "chat_bot",
    label: "chat_bot",
  },
  {
    value: "partner_landing_page",
    label: "partner_landing_page",
  },
  {
    value: "partner_portal",
    label: "partner_portal",
  },
];

const customerConnectWebsiteMediumOptions = [
  {
    value: "main_website",
    label: "main_website",
  },
  {
    value: "blog",
    label: "blog",
  },
  {
    value: "chat_bot",
    label: "chat_bot",
  },
  {
    value: "content_landing_page",
    label: "content_landing_page",
  },
];

const partnerContentMediumOptions = [
  { value: "ebook", label: "ebook" },
  { value: "press_release", label: "press_release" },
];

const partnerInProductMediumOptions = [
  { value: "pendo", label: "pendo" },
  { value: "login_page", label: "login_page" },
  { value: "analytics", label: "analytics" },
  { value: "engagement", label: "engagement" },
  { value: "analytics_lite", label: "analytics_lite" },
  { value: "engagement_lite", label: "engagement_lite" },
];

const partnerWebinarMediumOptions = [
  { value: "series_title", label: "series_title" },
];
const eventEventListMediumOptions = [
  { value: "attendee", label: "attendee" },
  { value: "engaged", label: "engaged" },
  { value: "demoed", label: "demoed" },
];

const customerMarketingMediumOptions = [
  { value: "customer_email", label: "customer_email" },
  { value: "pendo", label: "pendo" },
  { value: "login_page", label: "login_page" },
  { value: "customer_referral", label: "customer_referral" },
  { value: "customer_content", label: "customer_content" },
  { value: "knowledge_base", label: "knowledge_base" },
  { value: "customer_community", label: "customer_community" },
  { value: "userflow", label: "userflow" },
  { value: "intellicon", label: "intellicon" },
];

const educationMediumOptions = [
  { value: "knowledge_base", label: "knowledge_base" },
  { value: "customer_communiy", label: "customer_community" },
  { value: "userflow", label: "userflow" },
  { value: "webinar", label: "webinar" },
];

const inProductMarketingMediumOptions = [
  { value: "analytics", label: "analytics" },
  { value: "engagement", label: "engagement" },
  { value: "insurance", label: "insurance" },
  { value: "analytics_lite", label: "analytics_lite" },
  { value: "engagement_lite", label: "engagement_lite" },
  { value: "pendo", label: "pendo" },
  { value: "login_page", label: "login_page" },
  { value: "userflow", label: "userflow" },
];

const eventEmailMediumOptions = [
  { value: "pre_event_email", label: "pre_event_email" },
  { value: "post_event_email", label: "post_event_email" },
];

const eventWebsiteMediumOptions = [
  { value: "chat_bot", label: "chat_bot" },
  { value: "event_landing_page", label: "event_landing_page" },
];

const UrlBuilder = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [utmSource, setUtmSource] = useState([]);
  const [utmMedium, setUtmMedium] = useState([]);
  const [utmContent, setUtmContent] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [slashTag, setSlashTag] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [leadSource, setLeadSource] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [mediumOptions, setMediumOptions] = useState([]);

  const createUrl = (event) => {
    event.preventDefault();
    const body = {
      slashTag,
      destinationUrl: `${baseUrl}?campaign_id=${campaignId}&lead_source=${
        leadSource.value
      }&utm_source=${utmSource.value}&utm_medium=${
        utmMedium.value ? utmMedium.value : utmMedium
      }&utm_content=${utmContent}&utm_campaign=${campaignId}`,
      campaignName,
      utmContent,
    };
    axios
      .post(
        "https://di-marketing-server-iuzlr.ondigitalocean.app/api/shortenUrl",
        body
      )
      .then((res) => {
        console.log(res);

        if (res.data === "Already exists") {
          alert("URL with that Slash Tag already exists.");
        } else if (res.data === "Invalid format") {
          alert(
            "Invalid format. Check that slash tag and url are formatted correctly."
          );
        } else {
          setShortUrl(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateInputs = (sourceSelection) => {
    setUtmSource(sourceSelection);
    setUtmMedium(null);
    debugger;
    if (sourceSelection.value === "sponsored_speaker") {
      setShowInput(true);
    } else if (sourceSelection.value === "ppc") {
      setMediumOptions(ppcMediumOptions);
      setShowInput(false);
    } else if (
      sourceSelection.value === "website" &&
      leadSource.value == "event"
    ) {
      setMediumOptions(eventWebsiteMediumOptions);
      setShowInput(false);
    } else if (
      sourceSelection.value === "email" &&
      leadSource.value == "event"
    ) {
      setMediumOptions(eventEmailMediumOptions);
      setShowInput(false);
    } else if (
      sourceSelection.label === "social_media" &&
      leadSource.value == "event"
    ) {
      setMediumOptions(eventSocialMediumOptions);
      setShowInput(false);
    } else if (
      sourceSelection.label === "event_list" &&
      leadSource.value == "event"
    ) {
      setMediumOptions(eventEventListMediumOptions);
      setShowInput(false);
    } else if (
      sourceSelection.value === "website" &&
      leadSource.value == "partner"
    ) {
      setMediumOptions(partnerWebsiteMediumOptions);
      setShowInput(false);
    } else if (
      sourceSelection.value === "website" &&
      leadSource.value == "customer_connect_program"
    ) {
      setMediumOptions(customerConnectWebsiteMediumOptions);
      setShowInput(false);
    } else if (
      sourceSelection.value === "email" &&
      (leadSource.value == "partner" ||
        leadSource.value == "customer_connect_program")
    ) {
      setMediumOptions(partnerEmailMediumOptions);
      setShowInput(false);
    } else if (
      sourceSelection.label === "social_media" &&
      (leadSource.value == "partner" ||
        leadSource.value == "customer_connect_program")
    ) {
      setMediumOptions(socialMediumOptions);
      setShowInput(false);
    } else if (
      sourceSelection.label === "webinar" &&
      (leadSource.value == "partner" ||
        leadSource.value == "customer_connect_program")
    ) {
      // setMediumOptions(partnerWebinarMediumOptions);
      setShowInput(true);
    } else if (
      sourceSelection.label === "content" &&
      (leadSource.value == "partner" ||
        leadSource.value == "customer_connect_program")
    ) {
      setMediumOptions(partnerContentMediumOptions);
      setShowInput(false);
    } else if (
      sourceSelection.label === "in_product" &&
      (leadSource.value == "partner" ||
        leadSource.value == "customer_connect_program")
    ) {
      setMediumOptions(partnerInProductMediumOptions);
      setShowInput(false);
    } else if (sourceSelection.value === "website") {
      setMediumOptions(websiteMediumOptions);
      setShowInput(false);
    } else if (sourceSelection.value === "content") {
      setMediumOptions(contentDownloadMediumOptions);
      setShowInput(false);
    } else if (sourceSelection.value === "email") {
      setMediumOptions(emailMediumOptions);
      setShowInput(false);
    } else if (sourceSelection.value === "social_media") {
      setMediumOptions(socialMediumOptions);
      setShowInput(false);
    } else if (sourceSelection.value === "customer_marketing") {
      setMediumOptions(customerMarketingMediumOptions);
      setShowInput(false);
    } else if (sourceSelection.label === "podcast") {
      setShowInput(true);
    } else if (sourceSelection.label === "webinar") {
      setShowInput(true);
    } else if (sourceSelection.label === "event_demo") {
      setShowInput(true);
    } else if (sourceSelection.label === "event_landing_page") {
      setShowInput(true);
    } else if (sourceSelection.label === "event_raffle") {
      setShowInput(true);
    } else if (sourceSelection.label === "ae_referral") {
      setShowInput(true);
    } else if (sourceSelection.label === "in_product") {
      setMediumOptions(inProductMarketingMediumOptions);
      setShowInput(false);
    } else if (sourceSelection.label === "education_content") {
      setMediumOptions(educationMediumOptions);
      setShowInput(false);
    }
  };

  return (
    <Layout>
      <main className={styles.main}>
        <h1
          style={{ color: "#002856", fontSize: "37px" }}
          className="text-center mb-1 mt-2"
        >
          Marketing URL Builder
        </h1>
        <div className="d-flex justify-content-center mb-4 flex-column">
          <a
            target="_blank"
            style={{ color: "#002856", textDecorationLine: "underline" }}
            href="https://dentalintel10-my.sharepoint.com/:x:/g/personal/kkaufman_dentalintel_com/EcMKLyGbr4dKsGut6Zg4PG4BqqX3z67nha-8BTDaE9v5KA?e=jZn65O"
            className="text-center w-100"
          >
            View parameter instructions before creating a link
          </a>
          {/* <a
            target="_blank"
            style={{ color: "#002856", textDecorationLine: "underline" }}
            href="https://docs.google.com/spreadsheets/d/16_nNIZe4jvkwy5Qsw76IMxf040Z0piMq8_mTeeOZnDk/edit?usp=sharing"
            className="text-center w-100"
          >
            View URL Spreadsheet
          </a> */}
        </div>
        <form className={styles.form}>
          <input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            id="baseUrl"
            placeholder="Paste in the base URL here."
            className="form-control"
            type="text"
          />
          <small id="url_help" className="form-text text-muted text-center">
            Copy URL directly from the site then paste here.
          </small>
          <div className={styles.line}></div>
          <input
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
            id="campaign_id"
            placeholder="Campaign ID (UTM Campaign)"
            className="form-control"
            type="text"
          />
          <div className={styles.line}></div>
          <Select
            value={leadSource}
            onChange={(e) => {
              setLeadSource(e);
            }}
            placeholder={<div>Lead Source</div>}
            options={leadSourceOptions}
          />
          <div className={styles.line}></div>
          <Select
            value={utmSource}
            onChange={(e) => updateInputs(e)}
            placeholder={<div>UTM Source</div>}
            options={
              leadSource.value === "marketing"
                ? marketingSourceOptions
                : leadSource.value === "event"
                ? eventSourceOptions
                : leadSource.value === "education"
                ? educationSourceOptions
                : partnerSourceOptions
            }
          />
          <div className={styles.line}></div>
          {showInput ? (
            <input
              value={utmMedium}
              onChange={(e) => setUtmMedium(e.target.value)}
              placeholder="UTM Medium"
              className="form-control"
              type="text"
            />
          ) : (
            <Select
              value={utmMedium}
              onChange={(e) => setUtmMedium(e)}
              placeholder={<div>UTM Medium</div>}
              options={mediumOptions}
            />
          )}

          <div className={styles.line}></div>
          <input
            value={utmContent}
            onChange={(e) => setUtmContent(e.target.value)}
            id="utm_content"
            placeholder="UTM Content"
            className="form-control"
            type="text"
          />
          <small id="content_help" className="form-text text-muted text-center">
            (optional) – use this to denote variations of the same campaign,
            e.g. video_ad and image_ad
          </small>

          <div className={styles.line}></div>
          <input
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            id="campaign_name"
            placeholder="Full name of campaign"
            className="form-control"
            type="text"
          />
          <div className={styles.line}></div>
          <input
            value={slashTag}
            onChange={(e) => setSlashTag(e.target.value)}
            id="slash_tag"
            placeholder="Slash Tag - e.g. info.dentalintel.com/THIS-IS-A-SLASH-TAG"
            className="form-control"
            type="text"
          />
          <small id="slash_help" className="form-text text-muted text-center">
            No slashes. Only use - and _ when seperating words.
          </small>
          <div className={styles.line}></div>
          <button onClick={createUrl} className="btn btn-primary w-100">
            Create URL
          </button>
        </form>
        {shortUrl ? (
          <>
            <p className="text-center">Click the link to copy to clipboard.</p>
            <h2
              style={{
                cursor: "pointer",
                color: "#002856",
                fontSize: "30px",
              }}
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
              }}
              className="text-center"
            >
              {shortUrl}
            </h2>
          </>
        ) : null}
      </main>
    </Layout>
  );
};

export default UrlBuilder;
