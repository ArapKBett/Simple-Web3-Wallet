Install Node.js and npm
Verify the installation
```node -v```
```npm -v```

Open your terminal and create a new directory for your project:
```mkdir my-ethers-project```
```cd my-ethers-project```

initialize 
`npm init -y`

Install ethers.js using npm
`npm install ethers`

Create a new JavaScript file (e.g., index.js) 
`touch index.js`

Write Your ethers.js code. 

Run Your Code
`node index.js`

For security, store sensitive information like private keys and API keys in environment variables. 
`npm install dotenv`

Create a `.env` file in your project directory
`PRIVATE_KEY=your-private-key-here`
`INFURA_API_KEY=your-infura-api-key-here`

Load these variables in your code:
```require('dotenv').config();```
```const privateKey = process.env.PRIVATE_KEY;```
```const infuraApiKey = process.env.INFURA_API_KEY;```

You can use different providers like Infura, Alchemy, or your own Ethereum node. For example, to use Infura:
```const provider = new ethers.providers.InfuraProvider('ropsten', infuraApiKey);```

