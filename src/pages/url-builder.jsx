import React, { useState, useMemo } from "react";
import Layout from "../components/Layout";
import * as styles from "./../components/modules/url-builder.module.css";
import Select from "react-select";
import axios from "axios";
import { render } from "react-dom";


const leadSourceOptions = [
  { value: "marketing", label: "marketing" },
  { value: "event", label: "event" },
  { value: "partner", label: "partner" },

];

const marketingSourceOptions = [
  { value: "ppc", label: "ppc" },
  { value: "website", label: "website" },
  { value: "email", label: "email" },
  { value: "social_media", label: "social_media" },
  { value: "customer_marketing", label: "customer_marketing" },
  { value: "podcast", label: "podcast" },
  { value: "webinar", label: "webinar" }
];

const eventSourceOptions = [
  { value: "event_email", label: "event_email" },
  { value: "event_social_media", label: "event_social_media" },
  { value: "event_demo", label: "event_demo" },
  { value: "event_raffle", label: "event_raffle" },
];

const partnerSourceOptions = [
  { value: "partner_social_media", label: "partner_social_media" },
  { value: "partner_email", label: "partner_email" },
  { value: "partner_webinar", label: "partner_webinar" },
  { value: "partner_podcast", label: "partner_podcast" },
  { value: "partner_blog", label: "partner_blog" },
  { value: "partner_referral", label: "partner_referral" },
];

const ppcMediumOptions = [
  { value: "google", label: "google" },
  { value: "bing", label: "bing" },
  { value: "capterra", label: "capterra" },
  { value: "g2", label: "g2" },
  { value: "sourceforge", label: "sourceforge" },
];

const websiteMediumOptions = [
  { value: "main_website", label: "main_website" },
  { value: "blog", label: "blog" },
  { value: "chat_bot", label: "capterra" },
  { value: "content_landing_page", label: "content_landing_page" },
];

const emailMediumOptions = [
  { value: "paid_email", label: "paid_email" },
  { value: "marketing_email", label: "marketing_email" },
];

const socialMediumOptions = [
  { value: "meta_ads", label: "meta_ads" },
  { value: "linkedin_ads", label: "linkedin_ads" },
  { value: "facebook", label: "facebook" },
  { value: "instagram", label: "instagram" },
  { value: "twitter", label: "twitter" },
  { value: "linkedin", label: "linkedin" },
];

const customerMarketingMediumOptions = [
  { value: "customer_email", label: "customer_email" },
  { value: "pendo", label: "pendo" },
  { value: "login_page", label: "login_page" },
];

const eventEmailMediumOptions = [
  { value: "pre_event_email", label: "pre_event_email" },
  { value: "post_event_email", label: "post_event_email" },
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
      destinationUrl: `${baseUrl}?campaign_id=${campaignId}&lead_source=${leadSource.value}&utm_source=${utmSource.value}&utm_medium=${utmMedium.value}&utm_content=${utmContent}&utm_campaign=${campaignId}`,
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
          alert("Invalid format. Check that slash tag and url are formatted correctly.");
        } else {
          setShortUrl(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };




  const updateInputs = (sourceSelection) => {
    setUtmSource(sourceSelection)
    setUtmMedium(null)
    if (sourceSelection.value === 'ppc') {
      setMediumOptions(ppcMediumOptions)
      setShowInput(false)
    } else if (sourceSelection.value === 'website') {
      setMediumOptions(websiteMediumOptions)
      setShowInput(false)
    } else if (sourceSelection.value === 'email') {
      setMediumOptions(emailMediumOptions)
      setShowInput(false)
    } else if (sourceSelection.value === 'social_media') {
      setMediumOptions(socialMediumOptions)
      setShowInput(false)
    } else if (sourceSelection.value === 'customer_marketing') {
      setMediumOptions(customerMarketingMediumOptions)
      setShowInput(false)
    } else if (sourceSelection.value === 'event_email') {
      setMediumOptions(eventEmailMediumOptions)
      setShowInput(false)
    } else if (sourceSelection.label === 'podcast') {
      setShowInput(true)
    } else if (sourceSelection.label === 'webinar') {
      setShowInput(true)
    } else if (sourceSelection.label === 'event_social_media') {
      setShowInput(true)
    } else if (sourceSelection.label === 'event_demo') {
      setShowInput(true)
    } else if (sourceSelection.label === 'event_raffle') {
      setShowInput(true)
    } else if (sourceSelection.label === 'partner_social_media') {
      setShowInput(true)
    } else if (sourceSelection.label === 'partner_email') {
      setShowInput(true)
    } else if (sourceSelection.label === 'partner_webinar') {
      setShowInput(true)
    } else if (sourceSelection.label === 'partner_podcast') {
      setShowInput(true)
    } else if (sourceSelection.label === 'partner_blog') {
      setShowInput(true)
    } else if (sourceSelection.label === 'partner_referral') {
      setShowInput(true)
    }
  }
    return (
      <Layout>
        <main className={styles.main}>
          <h1 style={{color: '#002856', fontSize: '37px'}} className='text-center mb-1 mt-2'>Marketing URL Builder</h1>
          <div className='d-flex justify-content-center mb-4 flex-column'>
            <a
              target='_blank'
              style={{color: '#002856', textDecorationLine: 'underline'}}
              href='https://docs.google.com/spreadsheets/d/1AOXYoct0hutM_mmnRHer5MWXBF8-4BJDG6-bnWPbXdU/edit#gid=0'
              className='text-center w-100'>
              View parameter instructions before creating a link
            </a>
            <a
              target='_blank'
              style={{color: '#002856', textDecorationLine: 'underline'}}
              href='https://docs.google.com/spreadsheets/d/16_nNIZe4jvkwy5Qsw76IMxf040Z0piMq8_mTeeOZnDk/edit?usp=sharing'
              className='text-center w-100'>
              View URL Spreadsheet
            </a>
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
              placeholder='Campaign ID (UTM Campaign)'
              className='form-control'
              type='text'
            />
            <div className={styles.line}></div>
            <Select
              value={leadSource}
              onChange={(e) => setLeadSource(e)}
              placeholder={<div>Lead Source</div>}
              options={leadSourceOptions}
            />
            <div className={styles.line}></div>
            <Select
              value={utmSource}
              onChange={(e) => updateInputs(e)}
              placeholder={<div>UTM Source</div>}
              options={leadSource.value === 'marketing' ? marketingSourceOptions : (leadSource.value === 'event' ? eventSourceOptions : partnerSourceOptions)}
            />
            <div className={styles.line}></div>
            {showInput ? (
              <input
                value={utmMedium}
                onChange={(e) => setUtmMedium(e.target.value)}
                placeholder='UTM Medium'
                className='form-control'
                type='text'
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
                style={{ cursor: "pointer", color: "#002856", fontSize:'30px' }}
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
