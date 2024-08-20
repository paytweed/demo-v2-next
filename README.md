# Tweed's Demo app for the SDKv2 written in Next.JS

The demo allows the user to try and feel Tweed's main products, including NFT Checkout (both free and paid) and Tweed Wallet creation and authentication

## Context

This demo includes an example implementation for a connection to both SDKv1 and SDKv2,  
Using the SDKv1 for the Checkout processes (both free-mint and paid-mint).  
And using the SDKv2 for the wallet creation, and management.

The user first creates a Tweed wallet via the SDKv1,  
After that he sends the wallet address as the destination parameter to the SDKv2 checkout process.

## Setup locally

### Prerequisites

There are few prerequisite for the project:

- Alchemy API Key - The implementation requires a valid Alchemy key in order to call the `GetOwnedNfts` function and list the account's NFTs

- On the `Polygon Amoy` chain there are no official USDC contract, so Tweed's dev team has deployed a dedicated demo NFT contract to the chain,  
    To be used specifically for the purpose of transferring a token with the name "USDC", in analogy to mainnet.  
    The contract's address can be seen in the call to Tweed's function.

### Install

After cloning the repository, Install dependencies with:

`yarn`

### Configure

Copy the `.env.example` to `.env.local` and redefine the variables accordingly:

- `NEXT_PUBLIC_APPLICATION_ID`: The ApplicationID of the SDKv2 (can be obtained in [Tweed's Dashboard](https://dashboard.paytweed.com/)).
- `TWEED_API_KEY`: The demo API KEY of the SDKv1 (can be obtained in [Tweed's v1 Console](https://console.paytweed.com/))
- `TWEED_API_SECRET`: The demo API SECRET of the SDKv1 (can be obtained in [Tweed's v1 Console](https://console.paytweed.com/))
- `ALCHEMY_API_KEY`: An API KEY for alchemy (see [Alchemy docs](https://docs.alchemy.com/docs/alchemy-quickstart-guide))

### Run

Run the project using:

`yarn dev`

**Note:**  
When first running the application or when changing the userId/userEmail the application will recreate an SDKv1 wallet automatically when loading the page.

## More about Tweed

You can read more in the [Official Tweed Docs](https://docs.paytweed.com)
