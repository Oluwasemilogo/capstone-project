import React, { useState } from "react";
import styles from "./ShorteningResult.module.css";
import classNames from "classnames";

interface Link {
  shortLink: string;
  originalLink: string;
  newLink: string;
  linkId: string;
}

interface ShorteningResultProps {
  links: Link;
}

const ShorteningResult: React.FC<ShorteningResultProps> = ({ links }) => {
  const [, setCopyLink] = useState<string>(""); // Use the `copyLink` state

  const [copied, setCopied] = useState<string>("");

  const handleCopyLink = (linkToCopy: string, linkId: string) => {
    setCopyLink(linkToCopy); // Update the `copyLink` state
    navigator.clipboard.writeText(linkToCopy);
    setCopied(linkId);
    console.log(linkToCopy);
  };




  return (
    <>
   
            <div key={links.linkId} className={styles.result}>
              <p className={styles.originalLink}>{links.originalLink}</p>
              <hr />
              <p className={styles.newLink}>{links.shortLink}</p>

              <button
                className={classNames(
                  styles.copyBtn,
                  copied === links.linkId ? styles.copied : null
                )}
                onClick={() => {
                  handleCopyLink(links.newLink, links.linkId);
                }}
              >
                {copied === links.linkId ? "Copied" : "Copy"}
              </button>
            </div>
     
    </>
  );
};

export default ShorteningResult;


