export const Home: React.FC<{ handleLogout: () => void }> = ({ handleLogout }) => {
  return (
    <>
      <div className="dark:border-black-secondary dark:bg-black-background top-0 z-40 flex h-[54px] shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          <img className="h-12 w-auto" src="/easygenerator-logo.jpg" alt="Your Company" />

          <button
            onClick={handleLogout}
            className="font-medium tracking-wider cursor-pointer border border-orange-600 py-2 px-4 rounded text-orange-600 hover:bg-orange-600 hover:text-white">
            Logout
          </button>
        </div>
      </div>

      <div className="justify-center h-full flex items-center flex-col">
        <img className="mx-auto h-40 w-auto" src="/easygenerator-logo.jpg" alt="Your Company" />
        <p className="tracking-wider text-xl">Welcome to EasyGenerator</p>
      </div>
    </>
  );
};
