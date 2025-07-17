const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { Keyring } = require('@polkadot/keyring');
const { u8aToHex } = require('@polkadot/util');
const fs = require('fs');
const readline = require('readline');

async function extractPrivateKey() {
  // Wait for crypto to be ready
  await cryptoWaitReady();
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const question = (query) => new Promise((resolve) => rl.question(query, resolve));
  
  try {
    // Get file path
    const filePath = await question('Enter path to your JSON keyfile: ');
    
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      process.exit(1);
    }
    
    // Read and parse JSON file
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log('Account address:', jsonData.address);
    
    // Get password
    const password = await question('Enter password for the account: ');
    
    // Create keyring and add account
    const keyring = new Keyring({ type: 'sr25519' });
    const pair = keyring.addFromJson(jsonData);
    
    // Decrypt with password
    pair.decodePkcs8(password);
    
    // Extract private key
    const privateKey = u8aToHex(pair.secretKey).slice(2); // Remove 0x prefix
    
    console.log('\n✅ Private key extracted successfully!');
    console.log('Private key (without 0x):', privateKey);
    console.log('\n📋 Add this to your .env file:');
    console.log(`PRIVATE_KEY=${privateKey}`);
    
    // Optionally write to .env file
    const updateEnv = await question('\nUpdate .env file automatically? (y/n): ');
    if (updateEnv.toLowerCase() === 'y') {
      const envPath = '.env';
      let envContent = '';
      
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }
      
      // Update or add PRIVATE_KEY
      if (envContent.includes('PRIVATE_KEY=')) {
        envContent = envContent.replace(/PRIVATE_KEY=.*/g, `PRIVATE_KEY=${privateKey}`);
      } else {
        envContent += `\nPRIVATE_KEY=${privateKey}\n`;
      }
      
      fs.writeFileSync(envPath, envContent);
      console.log('✅ .env file updated!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('Invalid password')) {
      console.error('The password is incorrect. Please try again.');
    }
  } finally {
    rl.close();
  }
}

extractPrivateKey();