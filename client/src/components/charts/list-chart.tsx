'use client';
import { ArrowDown10Icon } from 'lucide-react';

import {
    BriefcaseIcon, HomeIcon, ShieldExclamationIcon, ShoppingBagIcon
} from '@heroicons/react/solid';
import { Bold, Button, Color, Flex, Icon, List, ListItem, Text } from '@tremor/react';

type TransactionCategory = {
  name: string;
  icon: any;
  color: Color;
  numTransactions: number;
  amount: string;
};
const data: TransactionCategory[] = [
  {
    name: 'Groceries',
    icon: ShoppingBagIcon,
    color: 'sky',
    numTransactions: 24,
    amount: '$ 230',
  },
  {
    name: 'IT & Office',
    icon: HomeIcon,
    color: 'orange',
    numTransactions: 4,
    amount: '$ 990',
  },
  {
    name: 'Travel',
    icon: BriefcaseIcon,
    color: 'pink',
    numTransactions: 11,
    amount: '$ 2,345',
  },
  {
    name: 'Insurance',
    icon: ShieldExclamationIcon,
    color: 'emerald',
    numTransactions: 2,
    amount: '$ 1,450',
  },
];

export function ListChart() {
  return (
    <>
      <List className="mt-4">
        {data.map((transaction) => (
          <ListItem key={transaction.name}>
            <Flex justifyContent="start" className="truncate space-x-4">
              <Icon
                variant="light"
                icon={transaction.icon}
                size="md"
                color={transaction.color}
              />
              <div className="truncate">
                <Text className="truncate">
                  <Bold>{transaction.name}</Bold>
                </Text>
                <Text className="truncate">
                  {`${transaction.numTransactions} transactions`}
                </Text>
              </div>
            </Flex>
            <Text>{transaction.amount}</Text>
          </ListItem>
        ))}
      </List>
      <Button
        size="sm"
        variant="light"
        icon={ArrowDown10Icon}
        iconPosition="right"
        className="mt-4"
      >
        View details
      </Button>
    </>
  );
}
