"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { categoryColors } from "@/data/categories";
import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, RefreshCcw } from "lucide-react";

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }) => {
  const filteredAndSortedTransactions = transactions;

  const handleSort = () => {};

  return (
    <div className="space-y-4">
      {/* Transactions Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
              <div className="flex items-center">Date</div>
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
              <div className="flex items-center">Category</div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
              <div className="flex items-center justify-end">Amount</div>
            </TableHead>
            <TableHead>Recurring</TableHead>
            <TableHead className="w-[50px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedTransactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                No Transactions Found
              </TableCell>
            </TableRow>
          ) : (
            filteredAndSortedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                {/* ✅ Fixed Invalid Date Issue */}
                <TableCell>
                  {transaction.date && !isNaN(new Date(transaction.date).getTime()) ? (
                    format(new Date(transaction.date), "PP")
                  ) : (
                    <span className="text-red-500">Invalid Date</span>
                  )}
                </TableCell>

                <TableCell>{transaction.description}</TableCell>
                <TableCell className="capitalize">
                  <span
                    style={{ background: categoryColors[transaction.category] }}
                    className="px-2 py-1 rounded text-white text-sm"
                  >
                    {transaction.category}
                  </span>
                </TableCell>

                <TableCell className="text-right font-medium"
                  style={{ color: transaction.type === "EXPENSE" ? "red" : "green" }}>
                  {transaction.type === "EXPENSE" ? "-" : "+"}$
                  {transaction.amount.toFixed(2)}
                </TableCell>

                <TableCell>
                  {transaction.isRecurring ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline" className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200">
                            <RefreshCcw className="h-3 w-3" />
                            {RECURRING_INTERVALS[transaction.recurringInterval]}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-sm">
                            <div className="font-medium">Next Date:</div>
                            <div>
                              {/* ✅ Fixed Invalid Date Issue for Recurring Dates */}
                              {transaction.nextReccuringDate &&
                              !isNaN(new Date(transaction.nextReccuringDate).getTime()) ? (
                                format(new Date(transaction.nextReccuringDate), "PP")
                              ) : (
                                <span className="text-red-500">Invalid Date</span>
                              )}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      One-time
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
