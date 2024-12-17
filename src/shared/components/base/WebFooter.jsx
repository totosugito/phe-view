import React from "react";
import { FaYoutube, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const WebFooter = ({domainUrl, companyLogo, ...props}) => {
  const className="text-lg text-app-primary"
  return (
    <footer className="footer text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <a href={domainUrl} target={"_blank"}><img src={companyLogo} width={150} loading='lazy' alt=''/></a>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        {props?.accountFacebook && <a href={props?.accountFacebook} target={"_blank"} style={{color: 'inherit'}}>
          <FaFacebook className={className}/></a>}
        {props?.accountYoutube && <a href={props?.accountYoutube} target={"_blank"} style={{color: 'inherit'}}>
          <FaYoutube className={className}/></a>}
        {props?.accountTwitter && <a href={props?.accountTwitter} target={"_blank"} style={{color: 'inherit'}}>
          <FaTwitter className={className}/></a>}
        {props?.accountInstagram && <a href={props?.accountInstagram} target={"_blank"} style={{color: 'inherit'}}>
          <FaInstagram className={className}/></a>}
      </nav>
    </footer>
  )
}
export default WebFooter