import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
 const reactotron = Reactotron
	.configure({
		name:"Siêu thị vật liệu xây dựng",
	   	host: "192.168.1.46" // địa chỉ ip của máy tính
    }) 
    .use(reactotronRedux())
    .connect()
export const log = reactotron.log
export default reactotron