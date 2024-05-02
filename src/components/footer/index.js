import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Footer = () => {
  const { t } = useTranslation();
  const logoIcon = require("../../asserts/img/logo.png");
  return (
    <div className="text-white _background1 pl-5 pr-5 pt-20 pb-10 text-left _footerM">
      {/* <div className="flex item-center justify-between pl-5 pr-5 pt-20 pb-10 _widthPMax _marginAuto0"> */}
      <div className="_widthPMax _marginAuto0">
        <div className="flex items-center justify-between _flexNo">
          <Link to="/">
            <img className="h-5 mt-14 mb-14 _margin0" src={logoIcon} alt="" />
          </Link>
          <div className="w-80 flex items-center justify-around h-32 text-sm _title _footerList">
            <a href="">{t("footer.Terms")}</a>
            <a href="" className="ml-8">
            {t("footer.PrivacyPlicy")}
            </a>
          </div>
        </div>
        <div className="flex items-center justify-between _flexNo">
          <div className="text-xs text-slate-400 _nav-title">
            © 2024 OneU, {t("footer.AllRightsReserved")}
          </div>
          <div className="text-xs text-slate-400 _nav-title _paddingTop10">
          {t("footer.Email")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
