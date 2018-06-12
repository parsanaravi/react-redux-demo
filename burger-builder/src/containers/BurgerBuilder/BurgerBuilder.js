import React, { Component } from 'react';

import Ahoc from '../../hoc/Ahoc/Ahoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 1.49,
  cheese: 1.49,
  meat: 2.99,
  bacon: 1.99
}


class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 2.99,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients){
      //converts object into array of values again
      const sum = Object.keys(ingredients)
        .map(igKey => {
          return ingredients[igKey];
        })
        .reduce((sum,el) => {
          return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) =>{
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
      const oldCount = this.state.ingredients[type];
      if(oldCount <= 0){
        return;
      }
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
      this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
      this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
      alert('Continue');
    }

    render () {
        const disabledInfo={
          ...this.state.ingredients
        };
        for(let key in disabledInfo){
          disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Ahoc>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                />
            </Ahoc>
        );
    }
}

export default BurgerBuilder;
