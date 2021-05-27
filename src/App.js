import './App.css';
import axios from 'axios';
import { Component } from 'react';
import { Layout, Menu, Breadcrumb, Image, Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';

const { Header, Footer,  Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dataCountries: []
    };
  }
  
  handleChange = event => {
    this.setState({ name: event.target.value });
  }
  
  handleSubmit = event => {
    event.preventDefault();
  
    const country = {
      name: this.state.name
    };

    const countrySendValue = country.name;
    console.log(countrySendValue);
    
    axios.get('https://restcountries.eu/rest/v2/name/'+countrySendValue)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ dataCountries: res.data })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  
  render(){
    const contentData = this.state.dataCountries.map((data) =>
      <div className="site-card-wrapper" key={data.name}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title={data.name} bordered={false}>
            <p><strong>Country:</strong> {data.name}</p>
            <p><strong>Region:</strong> {data.region}</p>
            <p><strong>Currency name:</strong> {data.currencies.name}</p>
            <p><strong>Language name:</strong> {data.languages.name}</p>
            <p><strong>Population:</strong> {data.population}</p>
            </Card>
          </Col>
        </Row>
      </div>
    );
    return (
      <div>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo">
            <Image width={130} src="/logo-qualifinds.png"/>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1">Countries</Menu.Item>
            </Menu>
          </Header>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>Search</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
              <h1>Country search</h1>
              <form onSubmit={this.handleSubmit}>
                <label className="label-search"><strong> Country Name: </strong></label>
                <input className="input-search" type="text" name="name" placeholder="Please enter country name to search" onChange={this.handleChange} />
                <button className="btn-submit" type="submit">Search</button>
              </form>
              <div style={{padding:'50px'}}>
                {contentData}
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Exam Qualifinds ©2021 Created by José Vázquez</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
