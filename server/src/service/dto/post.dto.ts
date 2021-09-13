/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A PostDTO object.
 */
export class PostDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'title field' })
    title: string;

    @ApiModelProperty({ description: 'content field', required: false })
    content: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
