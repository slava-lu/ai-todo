import LocaleSwitcher from "./LocaleSwitcher";

export default function TopHeader() {
  return (
    <div className="sticky top-0 p-4 bg-gray-100 z-10">
      <div className="container flex justify-end">
        <LocaleSwitcher />
      </div>
    </div>
  );
}
