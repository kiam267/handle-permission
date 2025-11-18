'use client';
import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  selectRowsFn,
  RowSelectionInstance,
  Row,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { COLOR_OF_ROLES } from '@/constants/constant';
import BlogAlertDialog from '@/components/common/blog-alert-dialog';

/* 

name,
email,
avatar,
role,



*/

const data: User[] = [
  {
    id: 'm5gr84i9',
    name: 'kiam',
    roles: ['user', 'admin'],
    avatar: 'success',
    email: 'ken99@example.com',
  },
  {
    id: 'm5gr84i6',
    name: 'kiam hasan',
    roles: ['user', 'admin'],
    avatar: 'success',
    email: 'ken96@example.com',
  },
  {
    id: 'm5r84i6',
    name: 'hasan',
    roles: ['user'],
    avatar: 'success',
    email: 'ken6@example.com',
  },
];

export type User = {
  id: string;
  name: string;
  avatar: string;
  roles: string[];
  email: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() &&
            'indeterminate')
        }
        onCheckedChange={value =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => (
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
        <Avatar>
          <AvatarImage src={row.getValue('avatar')} />
          <AvatarFallback className="font-bold">
            <span>{row.original.name.charAt(0)}</span>
          </AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc'
            )
          }
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {row.getValue('email')}
      </div>
    ),
  },
  {
    accessorKey: 'roles',
    header: () => <div>Roles</div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-x-3">
          {row.original.roles.map(role => (
            <Badge
              key={role}
              className={cn(
                COLOR_OF_ROLES.map(
                  cr => role.includes(cr.role) && cr.color
                )
              )}
            >
              {role}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div className="">Action</div>,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(payment.id)
              }
            >
              Add Role
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(payment.id)
              }
            >
              Add Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function OrganizationTable() {
  const [sorting, setSorting] =
    React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState(
    {}
  );
  const [seletedRows, setSeletedRows] = React.useState<
    User[]
  >([]);
  

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  React.useEffect(() => {
    fatch(table.getSelectedRowModel().rows as Row<User>[]);
  }, [table.getSelectedRowModel().rows]);

  const fatch = async (rows: Row<User>[]) => {
    const newRows = rows.map(row => row.original);
    setSeletedRows([...newRows]);
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-x-5">
        <Input
          placeholder="Filter emails..."
          value={
            (table
              .getColumn('email')
              ?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table
              .getColumn('email')
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {seletedRows.length > 0 && (
          <BlogAlertDialog
            triggerButton={
              <Button
                variant="destructive"
                className="cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete</span>
              </Button>
            }
            rows={seletedRows}
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={
                    row.getIsSelected() && 'selected'
                  }
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length}{' '}
          of {table.getFilteredRowModel().rows.length}{' '}
          row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
