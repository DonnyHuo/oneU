function footer() {
  const logoIcon = require("../../asserts/img/logo.png");
  return (
    <div
      className="text-white _background1"
      style={{ width: "100%" }}
    >
      <div
        className="flex align-center justify-between pl-5 pr-5 pt-20 pb-10"
        style={{ width: "1200px", margin: "0 auto" }}
      >
        <div>
          <img className="h-5 mt-14 mb-14" src={logoIcon} />
          <div className="text-xs text-slate-400 _nav-title">
            © 2024 OneU, All Rights Reserved
          </div>
        </div>
        <div>
          <div className="flex items-center justify-around h-32 text-sm _title">
            <a href="">Terms</a>
            <a href="">Privacy Plicy</a>
            <a href="">Discord</a>
          </div>
          <div className="text-xs text-slate-400 _nav-title">
            For any inquiries, contact us at contact@innoguild.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default footer;
