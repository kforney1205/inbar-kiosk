function handlePlatformChange() {
  const platformType = document.getElementById('platformType').value;
  const passwordContainer = document.getElementById('passwordContainer');
  const pinContainer = document.getElementById('pinContainer');
  let platformURL = '';

  // Reset input fields
   document.getElementById('ifPassword').value = '';
  document.getElementById('ifPin').value = '';

  if (platformType === 'zoom' || platformType === 'webex') {
    passwordContainer.classList.remove('hidden');
    pinContainer.classList.add('hidden');
  } else if (platformType === 'pexip') {
    pinContainer.classList.remove('hidden');
    passwordContainer.classList.add('hidden');
  } else {
    passwordContainer.classList.add('hidden');
    pinContainer.classList.add('hidden');
  }

  switch (platformType) {
    case 'zoom':
      console.log('zoomcrc.com');
      break;
    case 'msteams':
      console.log('pexip.com');
      break;
    case 'gmeet':
      console.log('g.pexip.com');
      break;
    case 'webex':
      console.log('webex46.webex.com');
      break;
    default:
      console.log('No platform selected');
  }
}

function validateSessionID(platformType, sessionID) {
  const regexMap = {
    zoom: /^\d{9,11}$/, // Zoom ID (9-11 digits)
    webex: /^[a-zA-Z0-9]{9}$/, // WebEx ID (9 alphanumeric chars)
    gmeet: /^[a-zA-Z0-9\-]{10,12}$/, // Google Meet (10-12 chars with dashes)
    msteams: /^[a-zA-Z0-9\-]{9,12}$/, // MS Teams (alphanumeric with dashes)
    pexip: /^\d{6}$/, // Pexip (6 digits)
  };

  return regexMap[platformType].test(sessionID);
}

function handleSubmit() {
  const platformType = document.getElementById('platformType').value;
  const sessionID = document.getElementById('sessionID').value;
  const ifPassword = document.getElementById('ifPassword').value;
  const ifPin = document.getElementById('ifPin').value;

  // Validate session ID
  if (!validateSessionID(platformType, sessionID)) {
    alert('Please enter a valid Session ID for the selected platform.');
    return false;
  }

  // Determine the platform domain based on the platform type
  let platformDomain = '';
  switch (platformType) {
    case 'zoom':
      platformDomain = 'zoomcrc.com';
      break;
    case 'msteams':
      platformDomain = 'pexip.com';
      break;
    case 'gmeet':
      platformDomain = 'g.pexip.com';
      break;
    case 'webex':
      platformDomain = 'webex46.webex.com';
      break;
    default:
      platformDomain = platformType; // fallback if needed
  }

  // Build URL
  let url = `https://pex-gcc.com/inbar/m/?conference=${sessionID}`;
  
  if (ifPassword && (platformType === 'zoom' || platformType === 'webex')) {
    url += `.${ifPassword}`;
  }

  if (ifPin && platformType === 'pexip') {
    url += `&pin=${ifPin}`;
  }

  url += `@${platformDomain}`;

  // Navigate to the constructed URL
  window.location.href = url;
  return false; // Prevent form submission
}