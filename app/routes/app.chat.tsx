import { Page, Layout, Card,
    // TextField , Button, InlineStack
    } from '@shopify/polaris';
import { useEffect, useState } from 'react';
import axios from 'axios';


interface Message {
    _id: string;
    content: string;
}


const Chat = () => {

      const [messages, setMessages] = useState<Message[]>([]);


      const getAllUsers = async () => {
        try {
          const response = await axios.get<Message[]>('https://www.poppilan.com/api/getAllMessages');
          setMessages(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
    
      useEffect(() => {
        getAllUsers();
      }, []);






  return (
    <Page >
        <Layout>
            <Layout.Section>
            <div>
      <h1>CHAT</h1>
      {messages.length > 0 ? (
        <div>
          {messages.map((message: Message) => (
            <div key={message._id}>
                <Card>
                {message.content}
                </Card>
                <br/>
                </div>
          ))}
        </div>
      ) : (
        <p>No messages found</p>
      )}
    </div> 
                </Layout.Section>
                {/* <Layout.Section>
                    <div className='tabbar' style={{position: "fixed", bottom: "0", width: '95%'}}>
                <Card background='bg-fill-brand-hover'>
                <InlineStack  align='space-between'>

                 
                <TextField
                

      label=""
      autoComplete="off"
    />

    <Button>Send</Button>
    </InlineStack>
                </Card>

                </div>
            </Layout.Section> */}

        </Layout>
    </Page>


  )};

export default Chat;
