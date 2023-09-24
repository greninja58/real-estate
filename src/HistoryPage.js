import React,{useState,useEffect} from 'react';
import { Navbar } from './Navbar';
// import Table from 'react-bootstrap/Table';
function HistoryPage({ connectedWallet, currentAddress, contract, web3, allright }) {

  const [EventData,setEventData] = useState(null);

  async function getEventData(eventName, filter) {
    if (allright && connectedWallet) {
      const events = await contract.getPastEvents(eventName, {
        filter,
        fromBlock: 0,
        toBlock: 'latest'
      });

      const eventsWithTimestamp = await Promise.all(events.map(async (event) => {
        const block = await web3.eth.getBlock(event.blockNumber);
        const timestamp = ((block.timestamp).toString()) * 1000;
        return { ...event, timestamp };
      }));

      return eventsWithTimestamp;
    } else {
      return null;
    }
  }


  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
    return `${formattedDate} ${formattedTime}`;
  }

  const padZero = (num) => {
    return num.toString().padStart(2, '0');
  }

  const renderEventData = (data) => {
    if (data !== null) {
      if (data.length !== 0) {
        return (
          <>
            <table bordered responsive striped size='sm' variant='dark' style={{ marginTop: "1%", width: "20%" }}>
              <caption style={{ captionSide: "top", fontSize: "large", fontWeight: "600", color: "firebrick" }}>Document Data</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>DocumentID</th>
                  <th>DocumentHash</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((itm, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index}</td>
                        <td>{itm.returnValues[0]}</td>
                        <td>{itm.returnValues[1]}</td>
                        <td>{formatTimestamp(itm.timestamp)}</td>
                      </tr>
                    </React.Fragment>
                  ))
                }
              </tbody>
            </table>
          </>
        );
      } else {
        return (
          <span>No document data</span>
        );
      }
    } else {
      return (
        <span>Not connected</span>
      );
    }
  }

  useEffect(() => {
    const fetchEvents = async () => {
      const Events = await getEventData('DocumentAdded', {});

      setEventData(Events);
      
    };
    if (allright && connectedWallet) fetchEvents();
    // eslint-disable-next-line
  }, [allright, connectedWallet]);

  return (
    <div>
      <Navbar />
      <h2>History Page</h2>
      {connectedWallet ? (
        <p>Connected Wallet: {currentAddress}</p>
      ) : (
        <p>Please connect to a wallet</p>
      )}
      <p>List of all documents viewed/uploaded by the user</p>
      <div>{renderEventData(EventData)}</div>
    </div>
  );
}

export default HistoryPage;
