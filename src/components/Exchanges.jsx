import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import { Header } from "antd/lib/layout/layout";

const { Text } = Typography;
const { Panel } = Collapse;

const headerStyle = {
  marginTop: "20px",
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
};

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      {exchangesList ? (
        <Row>
          {exchangesList?.map((exchange) => (
            <Col span={24}>
              <Collapse>
                <Panel
                  key={exchange.id}
                  showArrow={false}
                  header={
                    <Row key={exchange.id}>
                      <Col span={6}>
                        <Text>
                          <strong>{exchange.rank}.</strong>
                        </Text>
                        <Avatar
                          className="exchange-image"
                          src={exchange.iconUrl}
                        />
                        <Text>
                          <strong>{exchange.name}</strong>
                        </Text>
                      </Col>
                      <Col span={6}>${millify(exchange.volume)}</Col>
                      <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                      <Col span={6}>{millify(exchange.marketShare)}%</Col>
                    </Row>
                  }
                >
                  {HTMLReactParser(exchange.description || "")}
                </Panel>
              </Collapse>
            </Col>
          ))}
        </Row>
      ) : (
        <Header style={headerStyle}>No Data Found.</Header>
      )}
    </>
  );
};

export default Exchanges;
