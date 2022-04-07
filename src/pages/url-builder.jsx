import React, { useState } from "react";
import Layout from "../components/Layout";
import * as styles from "./../components/modules/url-builder.module.css";
import Select from "react-select";
import axios from "axios";

const sourceOptions = [
  { value: "google", label: "google" },
  { value: "facebook", label: "facebook" },
  { value: "linkedin", label: "linkedin" },
  { value: "tiktok", label: "tiktok" },
  { value: "twitter", label: "twitter" },
  { value: "instagram", label: "instagram" },
  { value: "website", label: "website" },
  { value: "blog", label: "blog" },
  { value: "organic", label: "organic" },
  { value: "ebook", label: "ebook" },
  { value: "email", label: "email" },
  { value: "staff", label: "staff" },
  { value: "aadom", label: "aadom" },
];
const mediumOptions = [
  { value: "paid_search", label: "paid_search" },
  { value: "paid_social", label: "paid_social" },
  { value: "organic_social", label: "organic_social" },
  { value: "demo_request", label: "demo_request" },
  { value: "snapshot_request", label: "snapshot_request" },
  { value: "paid_email", label: "paid_email" },
  { value: "marketing_list", label: "marketing_list" },
  { value: "profitability_formula", label: "profitability_formula" },
  { value: "cta", label: "cta" },
];

const UrlBuilder = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [utmSource, setUtmSource] = useState(null);
  const [utmMedium, setUtmMedium] = useState(null);
  const [utmContent, setUtmContent] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [slashTag, setSlashTag] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const createUrl = (event) => {
    event.preventDefault();
    const body = {
      slashTag,
      destinationUrl: `${baseUrl}?campaign_id=${campaignId}&utm_source=${utmSource.value}&utm_medium=${utmMedium.value}&utm_content=${utmContent}`,
      campaignName,
      utmContent
    };
    axios
      .post(
        "https://di-marketing-server-iuzlr.ondigitalocean.app/api/shortenUrl",
        body
      )
      .then((res) => {
        console.log(res);
        setShortUrl(res.data);
      })
      .catch((err) => {
        showAlert()
      });
  };

  const showAlert = () => {
    alert('Please ensure that your formatting is correct. If it is, the link you are trying to create already exists. Use a different slash tag.')
  }

  return (
    <Layout>
      <main className={styles.main}>
        <h3 className='text-center mb-1 mt-5'>Marketing URL Builder</h3>
        <div className='d-flex justify-content-center mb-4'>
        <a target='_blank' href="https://docs.google.com/spreadsheets/d/16_nNIZe4jvkwy5Qsw76IMxf040Z0piMq8_mTeeOZnDk/edit?usp=sharing" className="text-center w-100">View URL Spreadsheet</a>
        </div>
        <form className={styles.form}>
          <input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            id='baseUrl'
            placeholder='Paste in the base URL here.'
            className='form-control'
            type='text'
          />
          <small id='url_help' className='form-text text-muted text-center'>
            Copy URL directly from the site then paste here.
          </small>
          <div className={styles.line}></div>
          <input
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
            id='campaign_id'
            placeholder='Campaign ID'
            className='form-control'
            type='text'
          />
          <div className={styles.line}></div>
          <Select
            value={utmSource}
            onChange={(e) => setUtmSource(e)}
            placeholder={<div>UTM Source</div>}
            options={sourceOptions}
          />
          <div className={styles.line}></div>
          <Select
            value={utmMedium}
            onChange={(e) => setUtmMedium(e)}
            placeholder={<div>UTM Medium</div>}
            options={mediumOptions}
          />
          <div className={styles.line}></div>
          <input
            value={utmContent}
            onChange={(e) => setUtmContent(e.target.value)}
            id='utm_content'
            placeholder='UTM Content'
            className='form-control'
            type='text'
          />
          <small id='content_help' className='form-text text-muted text-center'>
            (optional) – use this to denote variations of the same campaign,
            e.g. video_ad and image_ad
          </small>

          <div className={styles.line}></div>
          <input
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            id='campaign_name'
            placeholder='Full name of campaign'
            className='form-control'
            type='text'
          />
          <div className={styles.line}></div>
          <input
            value={slashTag}
            onChange={(e) => setSlashTag(e.target.value)}
            id='slash_tag'
            placeholder='Slash Tag - e.g. get.dentalintel.com/THIS-IS-A-SLASH-TAG' 
            className='form-control'
            type='text'
          />
              <small id='slash_help' className='form-text text-muted text-center'>
            No slashes. Only use - and _ when seperating words.
          </small>
          <div className={styles.line}></div>
          <button onClick={createUrl} className='btn btn-primary w-100'>
            Create URL
          </button>
        </form>
        {shortUrl ? (
          <>
            <p className='text-center'>Click the link to copy to clipboard.</p>
            <h2
              style={{ cursor: "pointer", color: "#007bff" }}
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
              }}
              className='text-center'>
              {shortUrl}
            </h2>
          </>
        ) : null}
      </main>
    </Layout>
  );
};

export default UrlBuilder;
