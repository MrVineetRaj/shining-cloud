import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import SideBar from "./components/SideBar";
import SearchBar from "./components/SearchBar";
import { CloudProvider } from "@/context/cloudContext"; // Only CloudProvider is used
import Storage from "./components/Storage";
// Define application metadata (used for SEO purposes)
export const metadata = {
  title: "Shining Cloud",
  description: "A Cloud Application where you can store your files and folders securely and access them from anywhere. ",  
};

// Root component that renders the application layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        {/* Wraps the application content with session management */}
        <body className=" text-black bg-sky-200">
          <CloudProvider>
            {/* Provides cloud context for child components */}
            <div className="flex relative w-[100vw] gap-0">
              <div className="bg-white p-1 md:px-4 md:py-4 sticky h-[100vh] shadow-lg shadow-gray-500 rounded w-auto">
                <SideBar />
                {/* Renders the sidebar component */}
              </div>
              <div className="right grid grid-cols-1 lg:grid-cols-3 w-[100%] h-[100%] px-2">
                <div className="flex flex-col col-span-3 md:col-span-2 border-0 ">
                  <SearchBar />
                  {/* Renders the search bar component */}
                  {children}
                  {/* Renders the provided child components within this layout */}
                </div>
                <div className="bg-white m-2 mr-0 hidden lg:block md:col-span-1 rounded-md p-4 h-[95vh]">
                  <Storage/>
                </div>
              </div>
            </div>
          </CloudProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}
