import { NextRequest, NextResponse } from "next/server";

async function getUnsplashImage(placeName: string): Promise<string> {
    try {
        const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
        if (!unsplashAccessKey) {
            // console.log('� Add UNSPLASH_ACCESS_KEY to .env.local for more images');
            return '';
        }
        
        // Clean place name for better search
        const cleanName = placeName
            .replace(/Hotel|Resort|Lodge|Inn|Guest House/gi, '')
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .trim();
        
        const searchQuery = encodeURIComponent(cleanName + ' travel destination');
        const unsplashUrl = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=1&orientation=landscape`;
        
        const response = await fetch(unsplashUrl, {
            headers: {
                'Authorization': `Client-ID ${unsplashAccessKey}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                return data.results[0].urls.regular;
            }
        }
        return '';
    } catch (error) {
        console.error('Unsplash error:', error);
        return '';
    }
}

async function getPexelsImage(placeName: string): Promise<string> {
    try {
        const pexelsApiKey = process.env.PEXELS_API_KEY;
        if (!pexelsApiKey) {
            return '';
        }
        
        const cleanName = placeName
            .replace(/Hotel|Resort|Lodge|Inn|Guest House/gi, '')
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .trim();
        
        const searchQuery = encodeURIComponent(cleanName);
        const pexelsUrl = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1&orientation=landscape`;
        
        const response = await fetch(pexelsUrl, {
            headers: {
                'Authorization': pexelsApiKey
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.photos && data.photos.length > 0) {
                return data.photos[0].src.medium;
            }
        }
        return '';
    } catch (error) {
        console.error('Pexels error:', error);
        return '';
    }
}

export async function POST(req: NextRequest) {
    const { placeName } = await req.json();
    
    try {
        // console.log(`🔍 Searching for images: ${placeName}`);
        
        // Strategy 1: Try OpenStreetMap + Wikimedia first (free, high quality)
        // console.log('📍 Trying OpenStreetMap + Wikimedia...');
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&addressdetails=1&extratags=1&limit=1`;
        
        const nominatimResponse = await fetch(nominatimUrl, {
            headers: {
                'User-Agent': 'AI-Trip-Planner/1.0'
            }
        });
        
        if (nominatimResponse.ok) {
            const nominatimData = await nominatimResponse.json();
            
            if (nominatimData && nominatimData.length > 0) {
                const place = nominatimData[0];
                const wikidataId = place.extratags?.wikidata;
                
                if (wikidataId) {
                    // console.log(`🔗 Found Wikidata ID: ${wikidataId}`);
                    
                    const wikimediaUrl = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${wikidataId}&property=P18&format=json`;
                    const wikimediaResponse = await fetch(wikimediaUrl);
                    
                    if (wikimediaResponse.ok) {
                        const wikimediaData = await wikimediaResponse.json();
                        const claims = wikimediaData.claims?.P18;
                        
                        if (claims && claims.length > 0) {
                            const imageFileName = claims[0].mainsnak.datavalue.value;
                            const encodedFileName = encodeURIComponent(imageFileName.replace(/ /g, '_'));
                            const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodedFileName}?width=600`;
                            
                            // console.log(`✅ Wikimedia image found: ${imageUrl}`);
                            return NextResponse.json(imageUrl);
                        }
                    }
                }
            }
        }
        
        // Strategy 2: Try Unsplash (high success rate)
        // console.log('🖼️ Trying Unsplash...');
        const unsplashImage = await getUnsplashImage(placeName);
        if (unsplashImage) {
            // console.log(`✅ Unsplash image found: ${unsplashImage}`);
            return NextResponse.json(unsplashImage);
        }
        
        // Strategy 3: Try Pexels as final fallback
        // console.log('📸 Trying Pexels...');
        // const pexelsImage = await getPexelsImage(placeName);
        // if (pexelsImage) {
        //     // console.log(`✅ Pexels image found: ${pexelsImage}`);
        //     return NextResponse.json(pexelsImage);
        // }
        
        // No image found
        // console.log(`ℹ️ No images found for: ${placeName}`);
        return NextResponse.json('');
        
    } catch (error: any) {
        console.error('❌ Error in image search:', error.message);
        return NextResponse.json('');
    }
}