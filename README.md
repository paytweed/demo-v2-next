# Tweed's Demo app for the SDKv2 written in Next.JS

The demo allows the user to try and feel Tweed's main products, including NFT Checkout (both free and paid) and Tweed Wallet creation and authentication

## Context

This demo includes an example implementation for a connection to both SDKv1 and SDKv2,  
Using the SDKv1 for the Checkout processes (both free-mint and paid-mint).  
And using the SDKv2 for the wallet creation, and management.

As a prerequisite for the project Tweed's dev team has deployed a dedicated demo NFT contract to the `Polygon Amoy` chain,  
To be used specifically in this project, The contract's address is:

## Setup locally

### Install

After cloning the repository, Install dependencies with:

`yarn`

### Configure

Copy the `.env.example` to `.env.local` and redefine the variables accordingly:

- `NEXT_PUBLIC_APPLICATION_ID`: The ApplicationID of the SDKv2 (can be obtained in [Tweed's Dashboard](https://dashboard.paytweed.com/)).
- `BASIC_AUTH_PASSWORD`: Any secure password for securing your demo app.
- `TWEED_API_KEY`: The demo API KEY of the SDKv1 (can be obtained in [Tweed's v1 Console](https://console.paytweed.com/))
- `TWEED_API_SECRET`: The demo API SECRET of the SDKv1 (can be obtained in [Tweed's v1 Console](https://console.paytweed.com/))
- `ALCHEMY_API_KEY`: An API KEY for alchemy (see [Alchemy docs](https://docs.alchemy.com/docs/alchemy-quickstart-guide))

### Run

Run the project using:

`yarn dev`

**Note:**  
When first running the application or when changing the userId/userEmail the application will recreate an SDKv1 wallet.

## More about Tweed

You can read more in the [Official Tweed Docs](https://docs.paytweed.com)
