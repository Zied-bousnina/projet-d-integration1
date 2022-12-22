/* This Nav requires Tailwind CSS v2.0+ */
import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/router";

export default function TopMenu() {
  const [clicked, setClicked] = useState(false);

  const [signnedin, setSigneedIn] = useState(false);
  const router = useRouter();
  const [alldata, setAlldata] = useState([]);
  const [storagedata, setStoragedata] = useState();

  useEffect(() => {
    // JSON.parse(localStorage?.getItem('user_id')) === '' ||
    // JSON.parse(localStorage?.getItem('user_id')) === undefined ||
    // JSON.parse(localStorage?.getItem('user_id')) === null ||
    // JSON.parse(localStorage?.getItem('user_id')) === '{}'
    //   ? setSigneedIn(false)
    //   : setSigneedIn(true)

    fetch("/api/fetchall", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        // setStoragedata(newObjectuser)

        setClicked(!clicked);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    // JSON.parse(localStorage?.getItem('user_id')) === '' ||
    // JSON.parse(localStorage?.getItem('user_id')) === undefined ||
    // JSON.parse(localStorage?.getItem('user_id')) === null ||
    // JSON.parse(localStorage?.getItem('user_id')) === '{}'
    //   ? setSigneedIn(false)
    //   : setSigneedIn(true)

    fetch("/api/fetchall", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (JSON.parse(localStorage?.getItem("user_id")) !== null) {
        } else {
          null;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Disclosure as="nav" className="bg-[#fff]">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div
                onClick={() => router.push("/")}
                className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
              >
                <div className="flex flex-shrink-0 items-center">
                  <div className="w-10 h-10  notshow bg-[#DA552F] text-[#fff] rounded-full border-2 border-[#DA552F] flex justify-center items-center">
                    <p>QCV</p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div>
                  {/* {console.log(storagedata, 'storagedata')} */}

                  {/* {signnedin ? (
                    <div className="loggedincontent flex gap-2 items-center justify-center relative ">
                      <div className="submit_text">
                        <h1
                          onClick={() => router.push('/preview')}
                          className="submit_main_text text-[#e12e0d] cursor-pointer"
                        >
                          My Resume
                        </h1>
                      </div>

                      <div
                        onClick={() => {
                          return router.push('/stepone')
                        }}
                        className="submit_text"
                      >
                        <h1
                          onClick={() => router.push('/stepone')}
                          className="submit_main_text text-[#e12e0d] cursor-pointer"
                        >
                          Create Resume
                        </h1>
                      </div>

                      <div
                        onClick={() => {
                          return router.push('/'), localStorage.clear()
                        }}
                        className="submit_text"
                      >
                        <h1 className="submit_main_text text-[#000000] cursor-pointer">
                          Logout
                        </h1>
                      </div>
                    </div>
                  ) : ( */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className="flex  items-center  flex-wrap gap-8 cursor-pointer ">
                      <div>
                        <button
                          onClick={() => {
                            return router.push("/signup");
                          }}
                          href="/"
                          className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                        >
                          Sign Up
                        </button>
                      </div>

                      <div>
                        <button
                          onClick={() => {
                            return router.push("/login");
                          }}
                          href="/login"
                          className="bg-[#f64900] hover:bg-[#f64900] text-[#fff] font-semibold hover:text-[#fff] py-2 px-4 border border-[#f64900] hover:border-transparent rounded"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Disclosure.Button>
                <div className="w-10 h-10 bg-[#DA552F] text-[#fff] rounded-full border-2 border-[#DA552F] flex justify-center items-center">
                  <p>PH</p>
                </div>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
