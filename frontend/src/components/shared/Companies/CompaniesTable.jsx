import React, { useState } from "react";
import {
  Table,
  TableCaption,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit2, Trash2Icon } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";

function CompaniesTable() {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  const handleDeleteCompany = async (id) => {
    try {
      const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany?.length <= 0 ? (
            <span>No Companies Available yet !</span>
          ) : (
            <>
              {filterCompany?.map((company) => {
                return (
                  <TableRow key={company._id}>
                    {" "}
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={company.logo} className="h-10" />
                      </Avatar>
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="float-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger asChild>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                          <div
                            className=" flex items-center gap-2 w-fit cursor-pointer "
                            onClick={() => {
                              navigate(`/admin/companies/${company._id}`);
                            }}
                          >
                            <Edit2 className="text-green-500" />
                            <span>Edit</span>
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <div className=" flex items-center gap-2 w-fit cursor-pointer ">
                                <span>
                                  <Trash2Icon className="text-red-500" />
                                </span>
                                <span>Delete</span>
                              </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your Company and remove
                                  jobs related to this company.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={()=>{handleDeleteCompany(company._id)}}>
                                  <Trash2Icon
                                    className="text-white "
                                  />
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
