# DEDAL

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.dev/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

DEDAL is a mobile application that uses the user's location, filters and preferences to generate a itinerary with points of interest along the way, such as restaurants or landmarks, based on the user's interests that is tailored to their needs.  
Overall, DEDAL provides a personalized and convenient way for users to navigate and explore their surroundings; users can also save their routes for future reference and share them with friends.  

## 🚀 How to launch

- Install packages with `npm install`.
- Run `npm run start` to start the app in local with expo.

## 📦️ Publishing

- Run `npm run build` to start the build of the apk. (https://expo.dev to download it)

## 📄 Documentations

- [Mock-up](https://www.figma.com/file/B54QIYrXTzgh6vJV2hQSdc/DEDAL-MobileAppv2?node-id=0%3A1&t=YbCbvyIhG1DzaMgn-1)
- [CodingStyle.md](doc/CodingStyle.md)
- [DesignStyle.md](doc/DesignStyle.md)

## 📝 Objectives

### to do:
- Make the dev branch link to a Github action to build the APK
- Make sure that checkError functions are not called when entering the SignUp screen
- Make the language must be set to the phone language
- Make sure that the translation is also done for the punctuation (Spanish traduzion ma qué)
- Make the "Remember me" button have the blue color DEDAL  

### to redo:
- Redo the instances of "Home" in "Map" because more explicit
- Redo the navigation method because it is messy and not very explicit (https://youtu.be/I7POH4acHV8)
- Redo the bottom bar to follow the Figma model
- Redo the CStyle because each file has different standards
- Redo the CSS because multiple style files  

### to check:
- See to correct warnings (npm warnings)
- See to protect from SQL injections
- See to protect from spams
- See to implement BetterDocs (https://github.com/SoftwareBrothers/better-docs)
