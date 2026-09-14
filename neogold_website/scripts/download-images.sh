#!/bin/bash

# Create the directory if it doesn't exist
mkdir -p public/images

# Download placeholder images
# Team images
curl -o public/images/about-team.jpg "https://placehold.co/1200x800/gold/white?text=Team+Photo"
curl -o public/images/team-member-1.jpg "https://placehold.co/400x400/gold/white?text=Team+Member+1"
curl -o public/images/team-member-2.jpg "https://placehold.co/400x400/gold/white?text=Team+Member+2"
curl -o public/images/team-member-3.jpg "https://placehold.co/400x400/gold/white?text=Team+Member+3"
curl -o public/images/team-member-4.jpg "https://placehold.co/400x400/gold/white?text=Team+Member+4"

# Partner logos
curl -o public/images/partner-logo-1.jpg "https://placehold.co/300x150/darkblue/white?text=Partner+1"
curl -o public/images/partner-logo-2.jpg "https://placehold.co/300x150/darkblue/white?text=Partner+2"

# UI screens
curl -o public/images/buy-gold-screen.jpg "https://placehold.co/600x400/gold/white?text=Buy+Gold+Screen"
curl -o public/images/gold-redemption.jpg "https://placehold.co/600x400/gold/white?text=Gold+Redemption"
curl -o public/images/register-screen.jpg "https://placehold.co/600x400/gold/white?text=Register+Screen"
curl -o public/images/secure-vault.jpg "https://placehold.co/600x400/gold/white?text=Secure+Vault"

# Other images
curl -o public/images/gold-bar.png "https://placehold.co/400x300/gold/white?text=Gold+Bar"
curl -o public/images/gold-investment.png "https://placehold.co/600x400/gold/white?text=Gold+Investment"

echo "Images downloaded successfully" 