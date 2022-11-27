import { View } from "./Themed";

export const Separator = () => (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom : '10%', paddingTop : '10%'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
);