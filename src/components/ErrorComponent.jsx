import {Alert, AlertIcon} from '@chakra-ui/react'


function ErrorComponent (){
    return <Alert
    status="error"
    pos={'fixed'}
    bottom={'4'}
    left={"50%"}
    transform={"translateX(-50%)"}
    w={'container.lg'}
    >
        <AlertIcon/>
        {"Error"}
    </Alert>
}
export default ErrorComponent;