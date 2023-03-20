import { Feather } from '../../constants/Themed'

export function BackButton(navigation) {
  return (
    <Feather style={{margin: 10}} name={'arrow-left'} size={24} onPress={() => navigation.goBack}/>
  )
}