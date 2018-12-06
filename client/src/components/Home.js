import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Card } from "semantic-ui-react";
// CSS
import styles from "../CSS/home.styl";

export default class Home extends Component {
  render() {
    return (
      <Grid>
        <Row center="xs">
          <Col xs={12}>
            <Card fluid className={styles["card-main"]}>
              <Card.Content>
                <Card.Header>
                  <h1 className={styles["main-title"]}>
                    A Simple TodoList In Seconds
                  </h1>
                </Card.Header>
                <Card.Description>
                  <p className={styles["sub-title"]}>
                    Type, Submit, Done. Sign up for a free account.
                  </p>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Link
                  to="/register"
                  className={styles["btn-block"] + " ui button"}
                >
                  Sign Up
                </Link>

                <p>
                  Already have an account? <Link to="/login">Go here..</Link>
                </p>
              </Card.Content>
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}
