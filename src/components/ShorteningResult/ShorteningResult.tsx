import React, { useState } from "react";
import styles from "./ShorteningResult.module.css";
import classNames from "classnames";

interface Link {
  originalLink: string;
  newLink: string;
  linkId: string;
}

interface ShorteningResultProps {
  links: Link[];
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

  // ... Rest of the code


  return (
    <>
      {links
        ? links.map((link) => (
            <div key={link.linkId} className={styles.result}>
              <p className={styles.originalLink}>{link.originalLink}</p>
              <hr />
              <p className={styles.newLink}>{link.newLink}</p>

              <button
                className={classNames(
                  styles.copyBtn,
                  copied === link.linkId ? styles.copied : null
                )}
                onClick={() => {
                  handleCopyLink(link.newLink, link.linkId);
                }}
              >
                {copied === link.linkId ? "Copied" : "Copy"}
              </button>
            </div>
          ))
        : null}
    </>
  );
};

export default ShorteningResult;
