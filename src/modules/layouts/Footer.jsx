const Footer = () => {
  return (
    <footer style={{ position: "sticky", bottom: 0, marginTop: "auto" }}>
      <div className="mb-2">
        <a href="mailto:example@example.com" className="hover:underline">
          example@example.com
        </a>
      </div>
      <div className="mb-2">
        <a
          href="https://github.com/your-github"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
      <div>
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
