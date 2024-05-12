"use client"
import React, { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { useRouter } from "next/navigation";
import { polygonAmoy } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [polygonAmoy],
  ssr: true,
});

const queryClient = new QueryClient();

function Navbar() {
  const [address, setAddress] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchWalletAddress = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAddress(address);
        } catch (error) {
          console.error("Error fetching wallet address:", error);
        }
      }
    };

    fetchWalletAddress();
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <header className="flex items-center h-20 min-w-[770px] justify-between px-[35px] shadow-[0_4px_2px_-2px_rgba(0,0,0,0.5)] sm:w-full">
            <div
              className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text font-raj text-2xl font-bold text-transparent hover:cursor-pointer"
              onClick={() => router.push("/")}
            >
              <img
                className="h-[55px]"
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhENUilxHHUTQharTQgs7IPU6cFMSv_h6KHSD82Wk6NjuzvW8Id97Z0TkZcgghsncWqSADiECjYlOJLpVOhVuDi0DWnrVLpqZOGHKlpS8c_or-RuHJ6fFot0yW8t4-EKvCIX10U7rCF9tvmltMCkayNSnxFrJbP-6lHMtJFIkAN9286YfBCi1nPU2DD/s320/Doc1%20(2).png"
                alt="Regenify Logo"
              />
              Regenify
            </div>
            <div className="flex items-center gap-12 ">
              <div className="flex items-center gap-[40px]">
                {address == "" ? (
                  <>
                    <div
                      className=" flex items-center bg-gradient-to-r from-green-500 to-green-700 bg-clip-text font-raj text-xl font-bold text-transparent hover:scale-110 hover:cursor-pointer"
                      onClick={() => router.push("/editor")}
                    >
                      Create
                    </div>
                    <div className="pt-2">
                      <ConnectButton />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className=" flex items-center bg-gradient-to-r from-green-500 to-green-700 bg-clip-text font-raj text-xl font-bold text-transparent hover:scale-110 hover:cursor-pointer"
                      onClick={() => router.push("/badges")}
                    >
                      My Badges
                    </div>
                    <div
                      className=" flex items-center bg-gradient-to-r from-green-500 to-green-700 bg-clip-text font-raj text-xl font-bold text-transparent hover:scale-110 hover:cursor-pointer"
                      onClick={() => router.push("/mint")}
                    >
                      Redeem
                    </div>
                    <div className="pt-2">
                      <ConnectButton />
                    </div>
                  </>
                )}
              </div>{" "}
            </div>
          </header>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Navbar;
