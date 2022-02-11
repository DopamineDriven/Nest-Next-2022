import { InputType, Field } from "@nestjs/graphql";
import { SortOrder } from "src/.generated/prisma-nestjs-graphql/prisma/enums/sort-order.enum";
import { UserOrderByRelevanceFieldEnum } from "src/.generated/prisma-nestjs-graphql/user/enums/user-order-by-relevance-field.enum";
@InputType()
export class UserOrderByRelevanceInput {

    @Field(() => [UserOrderByRelevanceFieldEnum], {nullable:false})
    fields!: Array<keyof typeof UserOrderByRelevanceFieldEnum>;

    @Field(() => SortOrder, {nullable:false})
    sort!: keyof typeof SortOrder;

    @Field(() => String, {nullable:false})
    search!: string;
}
